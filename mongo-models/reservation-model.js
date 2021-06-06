const mongoose = require('mongoose')

const hourSchema = new mongoose.Schema({
    stringId: String,
    className: String,
    hours: Number,
    minutes: Number,
    msTime: Number,
    title: String
})

const reservationSchema = new mongoose.Schema({
    name: String,
    startHour: hourSchema,
    finishHour: hourSchema,
    day: Number,
    month: Number,
    year: Number,
    timestamp: String,
    payDate: String,
    total: Number,
    isCanceled: Boolean,
    isPaid: Boolean,
    receiptUrl: String,
    sessionId: String,
    paymentIntent: String,
    userId: String,
    code: String,
})


reservationSchema.methods.cancel = function(){
    this.isCanceled = true
    this.save()
    return this
}

reservationSchema.methods.addSession = function(sessionId, paymentIntent){
    this.sessionId = sessionId
    this.paymentIntent = paymentIntent
    this.save()
    return this
}

reservationSchema.methods.pay = function(paymentIntent, code){
    this.paymentIntent = paymentIntent
    this.isPaid = true
    this.code = code
    this.save()
    return this
}

reservationSchema.methods.przelewyPay = function(code){
    this.isPaid = true
    this.code = code
    this.save()
    return this
}

reservationSchema.methods.addReceiptUrl = function(receiptUrl){
    this.receiptUrl = receiptUrl
    this.save()
    return this
}

module.exports = mongoose.models.ReservationSchema || mongoose.model('ReservationSchema', reservationSchema)
