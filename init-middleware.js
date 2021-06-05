import Cors from 'cors'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
            console.log('init middleware result', result)
            if (result instanceof Error) {
            return reject(result)
            }
            return resolve(result)
        })
    })
}

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // origin: process.env.ORIGIN,
      // credentials: true
    //   origin: false
    origin: "http://clubelo.com",
    credentials: true,
    methods: ["GET"]
    })
)

export default cors
  