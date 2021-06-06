import cors from '../../init-middleware'
import '../../server-setup/mongoose-setup'
import { getPrzelewyToken } from '../../server-utilities';
import { firebaseInit } from '../../server-setup/firebase';

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const moment = require('moment')
const ReservationSchema = require('../../mongo-models/reservation-model')
const UserSchema = require('../../mongo-models/user-model')

const admin = require('firebase-admin')
const timeLimit = 5

export default async(req, res) => {
 
    try {

        await cors(req, res)

        firebaseInit()
    
        const { token, year, month, day, startHour, finishHour, quantity,
            email, description='Reservation pay', country='PL', language='pl'
        } = req.body    

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

            setTimeout(async ()=>{
                try {
                    const found = await ReservationSchema.findById(reservation._id)
                    console.log('found', found)
                    if(!found.isPaid){
                        console.log('cancel reservation')
                        await found.cancel()
                    }
                } catch (error) {
                    console.log('cancel payment error', error)
                }
            }, timeLimit * 60 * 1000)

            const sessionId = reservation._id

            const przelewyToken = await getPrzelewyToken({
                sessionId, amount: total*100, email, description, country, language, timeLimit
            })
    
            res.status(200).json({
                message: "token was created",
                token: przelewyToken
            })
    
        } else{
            res.status(500).json('this time is not available.')        
        }

    } catch (error) {
        console.log('Error in reservation creation:', error)
        res.status(500).json('reservation creation error.')        
    }

}
