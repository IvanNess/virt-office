import cors from '../../init-middleware'

const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')
const UserSchema = require('../../mongo-models/user-model')
const admin = require('firebase-admin')

const { Pool } = require('pg')
const pool = new Pool()
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

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

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const dbConnection = mongoose.connection
dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', async function () {
    console.log('db connected!!!')
})

export default async(req, res) => {
    // Run cors
    await cors(req, res)

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch(err){
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }

    const {token, data} = req.body

    console.log('data', data)
    try {

        const decoded = await admin.auth().verifyIdToken(token)
        console.log('decoded', decoded)
        const uid = decoded.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()
        console.log('user', user)

        ;await (async () => {
            const client = await pool.connect()
            const postgresId = user.postgresId
            try {
                const resp = await client.query("UPDATE companies SET inner_logo = decode($1, 'base64') WHERE id = $2", 
                    [data,  postgresId]
                )
                console.log('resp', resp)
            } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                console.log('finally')
                client.release()
            }
        })()
        // .catch(err => res.status(500).json('postgres user update error.'))            

        console.log('end')
        return res.status(200).json({
            message: "logo data was updated",
        })

    } catch (error) {
        console.log('Error in logo updating:', error)
        res.status(500).json({message: error.message})        
    }

}