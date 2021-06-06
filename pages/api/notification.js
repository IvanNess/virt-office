import { initMiddleware } from '../../init-middleware';
import axios from 'axios';
import Cors from 'cors'
import crypto from 'crypto'
import pool from '../../server-setup/pg'
import moment from 'moment'
const PackageSchema = require('../../mongo-models/package-model')
const ReservationSchema = require('../../mongo-models/reservation-model')
const UserSchema = require('../../mongo-models/user-model')

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
                const pack = await PackageSchema.findById(sessionId).exec()
                console.log('pack', pack)
                pack.przelewyPay()    
            }
            if(checkRes.data.data.description==='Reservation pay'){
                const reservation = await ReservationSchema.findById(sessionId).exec()
                console.log('reservation', reservation)
                const code = Math.floor(Math.random()*10000)
                reservation.przelewyPay(code)  
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
            }
        }

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
