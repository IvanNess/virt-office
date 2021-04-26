// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'

const mongoose = require('mongoose')
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

// Initialize the cors middleware
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

    const {
        username, password, fullName, companyName, NIP, contactFullName, contactEmail, contactPhone
    } = req.body

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

        const checkedUser = await UserSchema.findOne({ username }).exec()
        if(checkedUser){
            return res.status(500).json('This username is already in use by another account.') 
        }

        const userRecord = await admin.auth().createUser({
            email: contactEmail,
            emailVerified: false,
            // phoneNumber: contactPhone,
            password,
            // displayName: username,
            // photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
        })
        console.log('Successfully created new user:', userRecord.uid)

        const token = await admin.auth().createCustomToken(userRecord.uid)

        //create postgres user
        ;await (async () => {
            const client = await pool.connect()
            const company_name = username
            const inner_logo = ''
            const outer_logo = ''
           
            try {
                const resp = await client.query("INSERT INTO companies(company_name, inner_logo, outer_logo) VALUES ($1, decode($2, 'base64'), decode($3, 'base64')) RETURNING id", 
                    [company_name, inner_logo, outer_logo]
                )            
                console.log(resp)

                const user = new UserSchema({
                    firebaseId: userRecord.uid, postgresId: resp.rows[0].id,
                    username, email: contactEmail, fullName, companyName, NIP, contactFullName, contactEmail, contactPhone
                })
        
                await user.save()
        
                res.status(200).json({
                    message: "user was created",
                    token
                })

            } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
            }
        })().catch((e)=>{
            console.log('error', e)
            return res.status(500).json('user record saving error in db.')        
        })    

    } catch (error) {
        console.log('Error creating new user:', error)
        if(error.message==="The email address is improperly formatted."){
            return res.status(500).json('The email address is improperly formatted.') 
        }
        if(error.message==="The email address is already in use by another account."){
            return res.status(500).json('The email address is already in use by another account.') 
        }
        return res.status(500).json('user record saving error in db.')        
    }
}
