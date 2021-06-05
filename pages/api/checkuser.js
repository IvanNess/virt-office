import cors from '../../init-middleware'

const mongoose = require('mongoose')
const UserSchema = require('../../mongo-models/user-model')

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

    const {username} = req.body

    try {

        const checkedUser = await UserSchema.findOne({ username }).exec()

        if(checkedUser){
            return res.status(500).json('This username is already in use by another account.') 
        }

        res.status(200).json('ok')

    } catch (error) {
        return res.status(500).json('is user exists error')        
    }
}
