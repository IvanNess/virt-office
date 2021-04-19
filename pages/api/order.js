// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const admin = require('firebase-admin')

const stripe = require('stripe')(process.env.STRIPE_SECRET);

import Cors from 'cors'
import initMiddleware from '../../init-middleware'

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

export default async (req, res) => {

  await cors(req, res)

  const {token, pakietTitle, hiredPeriod, price} = req.body

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
    
    const decodedToken = await admin.auth().verifyIdToken(token)
    
    res.statusCode = 200
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'p24'],
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: `${pakietTitle} - ${hiredPeriod}`,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/konto/pakiet`,
        cancel_url: `${process.env.ORIGIN}/konto/pakiet`,
    })
    // res.json({ id: session.id });
    res.json({ session });
  } catch (error) {
    console.log('Error in getting stripe session:', error)
    res.status(500).json('getting stripe session error.')    
  }
}