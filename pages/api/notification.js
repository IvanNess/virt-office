import { initMiddleware } from '../../init-middleware';
import axios from 'axios';
import Cors from 'cors'
import crypto from 'crypto'
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

        const status = checkRes.data.data.status

        console.log('checkres', checkRes.data)

        if(status===1){
            console.log('ADVANCED STATUS')

            const crc = process.env.CRC
            var hash = crypto.createHash('sha384');
            //passing the data to be hashed
            const string = `{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"${currency}","crc":"${crc}"}`
            const data = hash.update(string, 'utf-8');
            //Creating the hash in the required format
            const gen_hash = data.digest('hex');
            //Printing the output on the console
            // console.log("hash : " + gen_hash);
        

            const verificationRes = await axios({
                auth:{
                    username: merchantId,
                    password: process.env.RAPORT_KEY
                },
                url: `https://sandbox.przelewy24.pl/api/v1/transaction/verify`,
                method: "PUT",
                data: { merchantId, posId, sessionId, amount, currency, orderId, sign: gen_hash }
            })    

            console.log('verificationRes', verificationRes.data)

            if(checkRes.data.data.description==='Package pay'){
                const pack = await PackageSchema.findOne({ sessionId }).exec()
                console.log('pack', pack)
                pack.przelewyPay()    
            }
        }

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
