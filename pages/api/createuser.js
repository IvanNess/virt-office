// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'

const mongoose = require('mongoose')
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

    const {
        username, password, fullName, companyName, NIP, contactFullName, contactEmail, contactPhone
    } = req.body

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
        const userRecord = await admin.auth().createUser({
            email: contactEmail,
            emailVerified: false,
            // phoneNumber: contactPhone,
            password,
            displayName: username,
            // photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
        })
        console.log('Successfully created new user:', userRecord.uid)

        const token = await admin.auth().createCustomToken(userRecord.uid)

        const user = new UserSchema({
            firebaseId: userRecord.uid,
            username, email: contactEmail, fullName, companyName, NIP, contactFullName, contactEmail, contactPhone
        })

        await user.save()

        res.status(200).json({
            message: "user was created",
            token
        })

    } catch (error) {
        console.log('Error creating new user:', error)
        res.status(500).json('ad record saving error in db.')        
    }
}
