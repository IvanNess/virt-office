// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {initMiddleware} from '../../init-middleware'
import nodemailer from 'nodemailer'
import moment from 'moment'
import { getPrzelewyToken } from '../../server-utilities'
import '../../server-setup/mongoose-setup'
import {serviceAccount, firebaseInit} from '../../server-setup/firebase' 
import {runMiddleware} from '../../utilities'
import Cors from 'cors'

const PackageSchema = require('../../mongo-models/package-model')
const UserSchema = require('../../mongo-models/user-model')
const admin = require('firebase-admin')

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // origin: process.env.ORIGIN,
        // credentials: true
        //   origin: false
        origin: "http://clubelo.com",
        credentials: true,
        methods: ["GET"]
    })
)

export default async(req, res) => {

    try {

        await cors(req, res)

        firebaseInit()

        const {token, pakietName, cityId, hiredOfficeAdress, hiredPeriod, fullName,
            companyName, NIP, contactEmail, price, fullPrice, lengthCoeff, startDate,
            email, description='Package pay', country='PL', language='pl'
        } = req.body

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        const days = hiredPeriod === "Miesiąc" ? 31 :
        hiredPeriod === "Kwartał" ? 93 : 366

        const updStartDate = moment(startDate).startOf('date')
        const endDate =  moment(updStartDate).add(days-1, "d").endOf('date')

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
            startDate: updStartDate,
            endDate,
            days,
            price,
            fullPrice,
            lengthCoeff,
        })

        await pack.save()

        // https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
        // https://www.youtube.com/watch?v=-rcRf7yswfM


        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         type: 'OAuth2',
        //         user: process.env.EMAIL,
        //         pass: process.env.EMAIL_PASS,
        //         clientId: process.env.OAUTH_CLIENTID,
        //         clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //         refreshToken: process.env.OAUTH_REFRESH_TOKEN
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
        
        console.log('pack', pack)

        const sessionId = pack._id

        const przelewyToken = await getPrzelewyToken({sessionId, amount: fullPrice*100, email, description, country, language})

        res.status(200).json({
            message: "token was created",
            token: przelewyToken
        })

    } catch (error) {
        console.log('Error in package creation:', error)
        res.status(500).json('package creation error.')        
    }

}
