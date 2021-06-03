// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'


// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // origin: process.env.ORIGIN,
    // credentials: true
    origin: false
  })
)

export default async(req, res) => {
    // Run cors
    await cors(req, res)

    console.log('notification req', req)

    res.status(200).json('ok')
}
