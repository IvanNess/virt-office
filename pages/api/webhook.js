// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET)

export default async (req, res) => {

    const payload = req.body

    // console.log("Got payload: " + payload)
    console.log(req.body)

    res.statusCode = 200
}