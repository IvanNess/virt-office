// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import cors from '../../init-middleware'
import nodemailer from 'nodemailer'

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const mongoose = require('mongoose')
const UserSchema = require('../../mongo-models/user-model')
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

    const {token} = req.body

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

        await db.collection('packages').add({
            isPaid: false,
            userId: currentUser?.userId || false,
            pakietName: hiringChoices[0].choice,
            cityId: hiringChoices[1].id,
            hiredOfficeAdress: hiringChoices[1].choice,
            hiredPeriod: hiringChoices[2].choice,
            fullName: hiringChoices[3].choice.fullName,
            companyName: hiringChoices[3].choice.companyName,
            NIP: hiringChoices[3].choice.NIP,
            contactEmail: hiringChoices[3].choice.contactEmail,
            payDate: +new Date(),
            invoiceDate,
            expireDate: invoiceDate + packageDuration,
            price,
            sessionId: session.session.id //stripeSession
        })

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'p24'],
            line_items: [
              {
                price: 'price_1IKLYEBhtsW91uv7VQeUHpHd',
                quantity: 1
              },
            ],
            mode: 'payment',
            success_url: `${process.env.ORIGIN}/success`,
            cancel_url: `${process.env.ORIGIN}/canceled`,
        })

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //       user: process.env.EMAIL,
        //       pass: process.env.EMAIL_PASS
        //     }
        // })
      
        // const message = {
        //     from: process.env.EMAIL,
        //     to: ["ivan@hrex.eu"],
        //     subject: "Comment to approve",
        //     html: 'test'
        //     // html: `
        //     //     <p>There is new comment for article with adress:</p>
        //     //     <p>http://dyktighandverker.no${data.path}</p>
        //     //     <p>Name:</p>
        //     //     <p>${data.name}</p>
        //     //     <p>E-mail</p>
        //     //     <p>${data.email}</p>
        //     //     <p>Comment:</p>
        //     //     <p>${data.comment}</p>
        //     //     <a href='https://gh-comments-api.vercel.app/api/approvecomment?id=${writeResult.id}'>To approve this comment click here</a>
        //     // `
        // };
      
        // const info = await transporter.sendMail(message)
      
        // console.log("Message sent: %s", info.messageId);      

        res.status(200).json({
            message: "user was created",
            user
        })

    } catch (error) {
        console.log('Error in getting an user:', error)
        res.status(500).json('get user error.')        
    }
}
