// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET)

//https://stripe.com/docs/payments/checkout/fulfill-orders

//https://stripe.com/docs/stripe-cli#install

export default async (req, res) => {

    const payload = req.body

    // console.log("Got payload: " + payload)
    console.log(req.body)

    if(req.body.data.object === charge){
        const receipt_url = req.body.data.object.receipt_url
    }

    res.statusCode = 200
}