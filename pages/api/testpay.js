import cors from '../../init-middleware'

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const moment = require('moment')
const mongoose = require('mongoose')
const ReservationSchema = require('../../mongo-models/reservation-model')
const UserSchema = require('../../mongo-models/user-model')

const admin = require('firebase-admin')

export default async(req, res) => {
    // Run cors
    await cors(req, res)

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                  price_data: {
                    currency: 'pln',
                    product_data: {
                      name: `test pay`,
                    },
                    unit_amount: 200,
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: `http://localhost:3000/success`,
              cancel_url: `http://localhost:3000/cancel`, 
        })

        console.log('session', session)

        res.status(200).json({sessionId: session.id})        


    } catch (error) {
        console.log('Error:', error)
        res.status(500).json('not ok')        
    }

}
