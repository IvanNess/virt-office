const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firebaseId: String,
    username: String,
    email: String,
    fullName: String,
    companyName: String,
    NIP: Number,
    contactFullName: String,
    contactEmail: String,
    contactPhone: String,
})

userSchema.methods.updateUser = function(date){
    // this = {...this, ...date}
    this.save()
    return this
}

module.exports = mongoose.models.UserSchema || mongoose.model('UserSchema', userSchema)