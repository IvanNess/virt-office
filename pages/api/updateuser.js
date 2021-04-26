// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'

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

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()

        //check if new username is available
        if(user.username !== data.username){
            const found = await UserSchema.findOne({ username: data.username }).exec()
            if(found){
                console.log('Error in user updating: this name is not available.')
                return res.status(500).json('this name is not available.')                
            }
        }

        //check if it is necessary to update email
        if(data.email && user.email !== data.email){
            //create an record that we're going to update an email.
            const record = {
                oldEmail: user.email,
                newEmail: data.email,
                isChangedInFirebase: false,
                isCompleted: false
            }
            //save this record in UpdateEmailRecords db.
            // implement here...

            try {
                // update email in firebase
                await admin.auth().updateUser(uid, {
                    email: data.email
                })

                // update an updateEmailRecord with "isChangedInFirebase: true" prop.
                // implement here...
                
                const upd = await user.updateOne(data)

                // update an updateEmailRecord with "isCompleted: true" prop.
                // implement here...

                if(data.innerLogoChanged || data.companyNameChanged){
                    ;await (async () => {
                        const client = await pool.connect()
                        const postgresId = user.postgresId
                        try {
                            let resp
                            if(data.innerLogoChanged){
                                resp = await client.query("UPDATE companies SET inner_logo = decode($1, 'base64') company_name = $2 WHERE id = $3", 
                                    [data.innerLogo, data.companyName,  postgresId]
                                )
                            } else{
                                resp = await client.query("UPDATE companies SET company_name = $1 WHERE id = $2", 
                                    [data.companyName,  postgresId]
                                )
                            }
                                                                    
                        } finally {
                            // Make sure to release the client before any error handling,
                            // just in case the error handling itself throws an error.
                            console.log('finally')
                            client.release()
                        }
                    })().catch(err => res.status(500).json('postgres user update error.'))            
                }

                return res.status(200).json({
                    message: "user data was updated",
                    user: upd
                })
        
            } catch (error) {
                console.log('Error in email updating:', error)
                // update an updateEmailRecord with error message
                // implement here...

                return res.status(500).json('email updating error.')       
            }
        }

        const upd = await user.updateOne(data)

        if(data.innerLogoChanged || data.companyNameChanged){
            console.log('inner logo changed or companyname')
            ;await (async () => {
                const client = await pool.connect()
                const postgresId = user.postgresId
                try {
                    let resp
                    if(data.innerLogoChanged){
                        console.log('inner logo changed postgresId', postgresId)
                        resp = await client.query("UPDATE companies SET inner_logo = decode($1, 'base64'), company_name = $2 WHERE id = $3", 
                            [data.innerLogo, data.companyName,  postgresId]
                        )
                        console.log('resp', resp)
                    } else{
                        console.log('company name changed postgresId', postgresId)
                        resp = await client.query("UPDATE companies SET company_name = $1 WHERE id = $2", 
                            [data.companyName,  postgresId]
                        )
                    }
                    
                } finally {
                    // Make sure to release the client before any error handling,
                    // just in case the error handling itself throws an error.
                    console.log('finally')
                    client.release()
                }
            })().catch(err => res.status(500).json('postgres user update error.'))            
        }

        console.log('end')
        return res.status(200).json({
            message: "user data was updated",
            user: upd
        })

    } catch (error) {
        console.log('Error in user updating:', error)
        res.status(500).json('user update error.')        
    }

}
