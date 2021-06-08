const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firebaseId: String,
    postgresId: String,
    username: String,
    email: String,
    fullName: String,
    adress: String,
    companyName: String,
    NIP: Number,
    contactFullName: String,
    contactEmail: String,
    contactPhone: String,
})

module.exports = mongoose.models.UserSchema || mongoose.model('UserSchema', userSchema)