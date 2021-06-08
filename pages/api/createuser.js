// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import cors from '../../init-middleware'
import pool from '../../server-setup/pg'
import { firebaseInit } from '../../server-setup/firebase'
import '../../server-setup/mongoose-setup'

const UserSchema = require('../../mongo-models/user-model')
const admin = require('firebase-admin')
 
export default async(req, res) => {
    // Run cors
    await cors(req, res)

    const {
        username, password, fullName, companyName, NIP, contactFullName, contactPhone, innerLogo
    } = req.body

    firebaseInit()

    let postgresId = undefined
    let userRecord = undefined

    try {

        // const checkedUser = await UserSchema.findOne({ username }).exec()
        // if(checkedUser){
        //     return res.status(500).json('This username is already in use by another account.') 
        // }

        userRecord = await admin.auth().createUser({
            email: username,
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
            try {
                const company_name = username
                const inner_logo = innerLogo
                const outer_logo = ''    
                const resp = await client.query("INSERT INTO companies(company_name, inner_logo, outer_logo) VALUES ($1, decode($2, 'base64'), decode($3, 'base64')) RETURNING id", 
                    [company_name, inner_logo, outer_logo]
                )            
                console.log(resp)
                postgresId = resp.rows[0].id

                const user = new UserSchema({
                    firebaseId: userRecord.uid, postgresId: resp.rows[0].id,
                    username, fullName, companyName, NIP, contactFullName, contactPhone
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
        })()

    } catch (error) {
        console.log('Error creating new user:', error)
        if(error.message==="The email address is improperly formatted."){
            return res.status(500).json('The email address is improperly formatted.') 
        }
        if(error.message==="The email address is already in use by another account."){
            return res.status(500).json('The email address is already in use by another account.') 
        } else{
            if(userRecord){
                await admin.auth().deleteUser(userRecord.uid)
            }
            if(postgresId){
                await client.query("DELETE FROM companies WHERE id=$1", 
                    [postgresId]
                )            
            }
            return res.status(500).json('user record saving error in db.')        
        }
    }
}
