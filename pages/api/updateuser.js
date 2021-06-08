import cors from '../../init-middleware'
import { firebaseInit } from '../../server-setup/firebase'
import pool from '../../server-setup/pg'
import '../../server-setup/mongoose-setup'
// import transporter from '../../server-setup/nodemailer'
import nodemailer from 'nodemailer'


const UserSchema = require('../../mongo-models/user-model')
const admin = require('firebase-admin')


export default async(req, res) => {
    // Run cors
    await cors(req, res)
    
    firebaseInit()

    const {token, data} = req.body

    try {

        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await UserSchema.findOne({ firebaseId: uid }).exec()
        const oldData = {...user._doc}
        const username = user.username
        let upd

        //check if new username is available
        if(user.username !== data.username){
            const found = await UserSchema.findOne({ username: data.username }).exec()
            if(found){
                console.log('Error in user updating: this name is not available.')
                return res.status(500).json('this name is not available.')                
            }
        }

        //check if it is necessary to update username
        if(data.username && user.username !== data.username){

            try {
                const userrecord = await admin.auth().updateUser(uid, {
                    email: data.username
                })
                console.log('updated userrecord', userrecord.uid)

                try {
                    upd = await user.updateOne(data)
                    console.log('mongodb updated')
                } catch(error){ 
                    try {
                        await admin.auth().updateUser(uid, {email: username})                   
                        console.log('Error in email updating:', error)    
                        return res.status(500).json(error.message)
                    } catch (error) {
                        //send email with error
                        return res.status(500).json(error.message)                        
                    } 
                }

                try{
                    ;await (async () => {
                        const client = await pool.connect()
                        try {
                            const company_name = data.username
                            const prev_name = user.username    

                            const resp = await client.query("UPDATE companies SET company_name = $1 WHERE company_name = $2 RETURNING id", 
                                [company_name, prev_name]
                            )            
                            console.log('resp', resp)
                            const postgresId = resp.rows[0].id
                            console.log('pgid', postgresId)
            
                        } finally {
                            // Make sure to release the client before any error handling,
                            // just in case the error handling itself throws an error.
                            console.log('FINALLY')
                            client.release()
                        }
                    })()
            
                } catch (error) {
                    try{
                        await admin.auth().updateUser(uid, {
                            email: username
                        })   
                        console.log('old data', oldData)
                        upd = await user.updateOne(oldData)                
                        console.log('Error in email updating:', error)    
                        return res.status(500).json(error.message)       
                    } catch(error){
                        //send email

                        // const transporter = nodemailer.createTransport({
                        //     service: 'gmail',
                        //     host: "smtp.gmail.com",
                        //     port: 465,
                        //     secure: true,
                        //     auth: {
                        //         type: 'OAuth2',
                        //         user: process.env.EMAIL,
                        //         pass: process.env.EMAIL_PASS,
                        //         clientId: process.env.OAUTH_CLIENTID,
                        //         clientSecret: process.env.OAUTH_CLIENT_SECRET,
                        //         refreshToken: process.env.OAUTH_REFRESH_TOKEN
                        //     }
                        // })

                        // const message = {
                        //     from: process.env.EMAIL,
                        //     to: ["ivan@hrex.eu"],
                        //     subject: "User data updating error",
                        //     html: `error: ${error.message}; oldData: ${{...oldData}}; newData: ${{...data}}`
                        // };
                    
                        // const info = await transporter.sendMail(message)
                        return res.status(500).json(error.message)       
                    }
                }

                return res.status(200).json({
                    message: "user data was updated",
                    user: upd
                })
        
            } catch (error) {
                console.log('Error in email updating:', error)
                // update an updateEmailRecord with error message
                // implement here...

                return res.status(500).json(error.message)       
            }
        }

        upd = await user.updateOne(data)

        return res.status(200).json({
            message: "user data was updated",
            user: upd
        })

    } catch (error) {
        console.log('Error in user updating:', error)
        return res.status(500).json(error.message)        
    }

}