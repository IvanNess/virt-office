// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const mongoose = require('mongoose')
const ReservationSchema = require('../../mongo-models/reservation-model')
const UserSchema = require('../../mongo-models/user-model')

const admin = require('firebase-admin')

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // origin: process.env.ORIGIN,
    // credentials: true
    origin: false
  })
)

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

export default async(req, res) => {
    // Run cors
    await cors(req, res)

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch(err){
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }

    const { token, year, month, day, startHour, finishHour, quantity } = req.body

    try {

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        const dayReservations = await ReservationSchema.find({year, month, day, isCanceled: false}).exec()
        
        const filtered = dayReservations.filter(session=>{
            return (startHour.msTime <= session.finishHour.msTime && finishHour.msTime >= session.finishHour.msTime) ||
                (finishHour.msTime >= session.startHour.msTime && startHour.msTime <= session.startHour.msTime)
        })

        if(filtered.length === 0){

            const reservation = new ReservationSchema({
                startHour, finishHour, day, month, year, 
                total: quantity / 0.5 * 50, 
                timestamp: new Date(),
                payDate: +new Date(),
                isCanceled: false,
                isPaid: false,
                userId: user._id
            })

            await reservation.save()

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card', 'p24'],
                line_items: [
                  {
                    price: 'price_1Id7T9BhtsW91uv72N4gRACY',
                    quantity: quantity / 0.5
                  },
                ],
                mode: 'payment',
                success_url: `${process.env.ORIGIN}/konto/rezerwacja`,
                cancel_url: `${process.env.ORIGIN}/konto/rezerwacja`,
            })

            await reservation.addSessionId(session.id)

            res.status(200).json({
                message: "reservation was created",
                sessionId: session.id
            })
    
        } else{
            res.status(500).json('this time is not available.')        
        }

    } catch (error) {
        console.log('Error in reservation creation:', error)
        res.status(500).json('reservation creation error.')        
    }

}
