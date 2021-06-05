import NextCors from 'nextjs-cors';
const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')

export default async(req, res) => {
    console.log('notification req', req)

    try {
        await NextCors(req, res, {
            methods: ["PUT"],
            origin: 'http://clubelo.com',
         });

        console.log('after cors', )

        const {
            merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign
        } = req.body

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
