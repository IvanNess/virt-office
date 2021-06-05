// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'
const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: process.env.ORIGIN,
    credentials: true,
    // origin: false
  })
)

export default async(req, res) => {
    try {
        await cors(req, res)

        console.log('notification body', req.body)

        const {
            merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign
        } = req.body

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
