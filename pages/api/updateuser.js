import cors from '../../init-middleware'

const mongoose = require('mongoose')
const PackageSchema = require('../../mongo-models/package-model')
const UserSchema = require('../../mongo-models/user-model')
const admin = require('firebase-admin')

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

                // update companyname in postgresdb
                // implement here...

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

        res.status(200).json({
            message: "user data was updated",
            user: upd
        })

    } catch (error) {
        console.log('Error in user updating:', error)
        res.status(500).json('user update error.')        
    }

}