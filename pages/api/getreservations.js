import cors from '../../init-middleware'

const mongoose = require('mongoose')
const UserSchema = require('../../mongo-models/user-model')
const ReservationSchema = require('../../mongo-models/reservation-model')
const admin = require('firebase-admin')

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

    const {token, year, month, day} = req.body

    console.log('getreservations', year, month, day)

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch(err){
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }

    try {

        // const decodedToken = await admin.auth().verifyIdToken(token)
        // const uid = decodedToken.uid

        // const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        const dayReservations = await ReservationSchema.find({year, month, day, isCanceled: false}).exec()


        const updated =  dayReservations.map(reservation=>({...reservation, 
            userId: undefined,
            sessionId: undefined
        }))

        res.status(200).json({
            message: "getting reservations success",
            reservations: updated
        })

    } catch (error) {
        console.log('Error in getting reservations:', error)
        res.status(500).json('get reservations error.')        
    }
}
