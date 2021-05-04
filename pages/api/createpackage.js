// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'
import nodemailer from 'nodemailer'

const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')
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

    const {token, pakietName, cityId, hiredOfficeAdress, hiredPeriod, fullName,
        companyName, NIP, contactEmail, price, fullPrice, lengthCoeff, sessionId, startDate
    } = req.body

    try {

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        const pack = new PackageSchema({
            isPaid: false,
            userId: user._id,
            pakietName,
            cityId,
            hiredOfficeAdress,
            hiredPeriod,
            fullName,
            companyName,
            NIP,
            contactEmail,
            payDate: +new Date(),
            startDate,
            price,
            fullPrice,
            lengthCoeff,
            sessionId//stripeSession
        })

        await pack.save()

        // https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
        // https://www.youtube.com/watch?v=-rcRf7yswfM


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        })
      
        const message = {
            from: process.env.EMAIL,
            to: ["ivan@hrex.eu"],
            subject: "Comment to approve",
            html: 'test'
            // html: `
            //     <p>There is new comment for article with adress:</p>
            //     <p>http://dyktighandverker.no${data.path}</p>
            //     <p>Name:</p>
            //     <p>${data.name}</p>
            //     <p>E-mail</p>
            //     <p>${data.email}</p>
            //     <p>Comment:</p>
            //     <p>${data.comment}</p>
            //     <a href='https://gh-comments-api.vercel.app/api/approvecomment?id=${writeResult.id}'>To approve this comment click here</a>
            // `
        };
      
        const info = await transporter.sendMail(message)
      
        console.log("Message sent: %s", info.messageId);      

        res.status(200).json({
            message: "package was created",
            pack
        })

    } catch (error) {
        console.log('Error in package creation:', error)
        res.status(500).json('package creation error.')        
    }

}
