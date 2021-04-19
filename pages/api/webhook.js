// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const mongoose = require('mongoose')
const ReceiptSchema = require('../../mongo-models/receipt-model')
const PackageSchema = require('../../mongo-models/package-model')
const ReservationSchema = require('../../mongo-models/reservation-model')

//https://stripe.com/docs/payments/checkout/fulfill-orders

//https://stripe.com/docs/stripe-cli#install

const firebase = require('firebase')

const buffer = require("micro").buffer;


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
            const receipt = new ReceiptSchema({paymentIntent, receiptUrl})
            await receipt.save()
            // console.log('receipt_url', receiptUrl)
        }
    
        if(converted.type === 'checkout.session.completed'){
            //update isPaid field with true in packages db
            const sessionId = converted.data.object.id
            const paymentIntent = converted.data.object.payment_intent
            if(converted.data.object.success_url === `${process.env.ORIGIN}/konto/pakiet`){
                const pack = await PackageSchema.findOne({ sessionId }).exec()
                pack.pay(paymentIntent)
            }
            if(converted.data.object.success_url === `${process.env.ORIGIN}/konto/rezerwacja`){
                const reservation = await ReservationSchema.findOne({ sessionId }).exec()
                reservation.pay(paymentIntent)
            }
        }
    
        res.status(200).json('ok')
    
    } catch (error) {
        console.log(error)
        res.status(500).json('webhook error')        
    }
}