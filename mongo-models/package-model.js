const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    isPaid: Boolean,
    receiptUrl: String,
    isCanceled: Boolean,
    userId: String,
    pakietName: String,
    cityId: String,
    hiredOfficeAdress: String,
    hiredPeriod: String,
    fullName: String,
    companyName: String,
    NIP: Number,
    contactEmail: String,
    payDate: String,
    invoiceDate: Number,
    expireDate: Number,
    price: Number,
    sessionId: String,
    paymentIntent: String
})

packageSchema.methods.cancel = function(){
    this.isCanceled = true
    this.save()
    return this
}

packageSchema.methods.pay = function(paymentIntent){
    this.paymentIntent = paymentIntent
    this.isPaid = true
    this.save()
    return this
}

module.exports = mongoose.models.Package || mongoose.model('Package', packageSchema)
