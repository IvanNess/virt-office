// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET)

//https://stripe.com/docs/payments/checkout/fulfill-orders

//https://stripe.com/docs/stripe-cli#install

const firebase = require('firebase')

const buffer = require("micro").buffer;


// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec_HSM61qV9SLNeJ0uuTAobYf4VGJzwj5xL';

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async (req, res) => {

    // const payload = req.body
    console.log(req)

    const buf = await buffer(req)

    // console.log("Got payload: " + payload)
    console.log(buf)
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // if(req.body.data.object.object === "charge"){
    //     const receipt_url = req.body.data.object.receipt_url
    //     //get payment_intent and add receipt with receipt_url and payment_intent fields in receipt db
    //     console.log('receipt_url', receipt_url)
    // }

    // if(req.body.type === 'checkout.session.completed'){
    //     //update isPaid field with true in packages db
    // }

    const testRef = firebase.functions().httpsCallable('test')
    try {
        const resp = await testRef({data: 'aaa', buf, sig, endpointSecret})
        console.log('resp', resp)
    } catch (error) {
        console.log('error', error)
    }  
    res.statusCode = 200
    res.json({ name: 'John Doe' })

}