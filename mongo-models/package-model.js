const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    isPaid: Boolean,
    receiptUrl: String,
    isCanceled: Boolean,
    userId: String,
    pakietName: String,
    pakietTitle: String,
    cityId: String,
    hiredOfficeAdress: String,
    hiredPeriod: String,
    fullName: String,
    companyName: String,
    NIP: Number,
    contactEmail: String,
    payDate: Number,
    startDate: Number,
    endDate: Number,
    days: Number,
    invoiceDate: Number,
    expireDate: Number,
    price: Number,
    fullPrice: Number,
    lengthCoeff: Number,
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
    this.startDate = this.startDate || +new Date()
    this.save()
    return this
}

packageSchema.methods.przelewyPay = function(){
    this.isPaid = true
    this.save()
    return this
}

packageSchema.methods.addReceiptUrl = function(receiptUrl){
    this.receiptUrl = receiptUrl
    this.save()
    return this
}

module.exports = mongoose.models.Package || mongoose.model('Package', packageSchema)
