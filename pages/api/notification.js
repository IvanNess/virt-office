import { initMiddleware } from '../../init-middleware';
import axios from 'axios';
import Cors from 'cors'
const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')


const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // origin: process.env.ORIGIN,
        // credentials: true
        origin: false
    })
)

export default async(req, res) => {
    // console.log('notification req', req)

    try {
        await cors(req, res)

        const {
            merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign
        } = req.body

        const checkRes = await axios({
            auth:{
                username: merchantId,
                password: process.env.RAPORT_KEY
            },
            url: `https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/${sessionId}`,
            method: 'GET',
        })

        const status = checkRes.data.status

        console.log('checkres', checkRes.data)

        if(status===1){
            const verificationRes = await axios({
                auth:{
                    username: merchantId,
                    password: process.env.RAPORT_KEY
                },
                url: `https://sandbox.przelewy24.pl/api/v1/transaction/verify`,
                method: "PUT",
                data: { merchantId, posId, sessionId, amount, currency, orderId, sign }
            })    

            if(verificationRes.data.description==='Package pay'){
                const pack = await PackageSchema.findOne({ sessionId }).exec()
                pack.przelewyPay()    
            }
        }

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
