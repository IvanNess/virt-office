// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const mongoose = require('mongoose')
const moment = require('moment')
const ReceiptSchema = require('../../mongo-models/receipt-model')
const PackageSchema = require('../../mongo-models/package-model')
const UserSchema = require('../../mongo-models/user-model')
const ReservationSchema = require('../../mongo-models/reservation-model')

//https://stripe.com/docs/payments/checkout/fulfill-orders

//https://stripe.com/docs/stripe-cli#install

const firebase = require('firebase')

const buffer = require("micro").buffer;

const { Pool } = require('pg')
const pool = new Pool()
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


// Find your endpoint's secret in your Dashboard's webhook settings
// stripe listen --forward-to localhost:3000/api/webhook
const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;

export const config = {
    api: {
      bodyParser: false,
    },
};

const serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n') ,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_CERT_URL
}  

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const dbConnection = mongoose.connection
dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', async function () {
    console.log('db connected!!!')
})

export default async (req, res) => {

    // const payload = req.body
    // console.log('REQ', req)

    const buf = await buffer(req)

    // console.log("Got payload: " + payload)
    console.log(JSON.parse(buf))
    const converted = JSON.parse(buf)
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {

        if(converted.type === 'charge.succeeded'){
            const paymentIntent = converted.data.object.payment_intent
            const receiptUrl = converted.data.object.receipt_url
            //get payment_intent and add receipt with receipt_url and payment_intent fields in receipt db
            // const receipt = new ReceiptSchema({paymentIntent, receiptUrl})
            // await receipt.save()
            // console.log('receipt_url', receiptUrl)
            const reservation = await ReservationSchema.findOne({ paymentIntent }).exec()
            if(reservation){
                reservation.addReceiptUrl(receiptUrl)
            } else{
                const pack = await PackageSchema.findOne({ paymentIntent }).exec()
                pack.addReceiptUrl(receiptUrl)
            } 
        }
    
        if(converted.type === 'checkout.session.completed'){
            //update isPaid field with true in packages db
            const sessionId = converted.data.object.id
            const paymentIntent = converted.data.object.payment_intent
            if(converted.data.object.success_url === `${process.env.ORIGIN}/konto/pakiet`){
                const pack = await PackageSchema.findOne({ sessionId }).exec()
                pack.pay(paymentIntent)
            }
            if(converted.data.object.success_url === `${process.env.ORIGIN}/konto/moje-rezerwacje`){
                const reservation = await ReservationSchema.findOne({ sessionId }).exec()
                const code = Math.floor(Math.random()*10000)
                reservation.pay(paymentIntent, code)

                // const start_date = moment(reservation.startHour.msTime + 2*60*60*1000).format('YYYY-MM-DD HH:mm:ss')
                // const stop_date = moment(reservation.finishHour.msTime + 2*60*60*1000).format('YYYY-MM-DD HH:mm:ss')
                // console.log('webhook 1', start_date, stop_date)

                try{
                    ;await (async () => {
                        const client = await pool.connect()
                        try {
                            // add 2 hours as server time is two hours less.
                            const start_date = moment(reservation.startHour.msTime + 2*60*60*1000).format('YYYY-MM-DD HH:mm:ss')
                            const stop_date = moment(reservation.finishHour.msTime + 2*60*60*1000).format('YYYY-MM-DD HH:mm:ss')
                            console.log('webhook 1', start_date, stop_date, code)
                            const resp = await client.query('INSERT INTO access (start_date, stop_date, code) VALUES ($1, $2, $3)', 
                                [start_date, stop_date, code]
                            )
                            console.log('webhook first resp', resp)
                            const user = await UserSchema.findById(reservation.userId)
                            console.log('webhook user', user)
                            // const companyName = user.companyName
                            // const companyResp = await client.query("SELECT id FROM companies WHERE company_name = $1", [companyName])
                            // console.log('companyResp', companyResp)
                            // const company_id = companyResp.rows[0].id
                            const company_id = user.postgresId
                            console.log('company_id', company_id)
                            await client.query('INSERT INTO displays (start_date, stop_date, company_id) VALUES ($1, $2, $3)', 
                                [start_date, stop_date, company_id]
                            )                                                               
                        } finally {
                            // Make sure to release the client before any error handling,
                            // just in case the error handling itself throws an error.
                            console.log('finally')
                            client.release()
                        }
                    })()
                }catch (e){
                    return res.status(500).json('postgres webhook error.')
                }            
            }
        }
    
        return res.status(200).json('ok')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json('webhook error')        
    }
}