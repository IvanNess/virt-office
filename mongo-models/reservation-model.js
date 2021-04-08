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
    total: Number,
    isCanceled: Boolean,
    isPaid: Boolean,
    receiptUrl: String,
    sessionId: String,
    paymentIntent: String,
    userId: String
})


reservationSchema.methods.cancel = function(){
    this.isCanceled = true
    this.save()
    return this
}

reservationSchema.methods.addSessionId = function(sessionId){
    this.sessionId = sessionId
    this.save()
    return this
}

reservationSchema.methods.pay = function(paymentIntent){
    this.paymentIntent = paymentIntent
    this.isPaid = true
    this.save()
    return this
}

module.exports = mongoose.models.ReservationSchema || mongoose.model('ReservationSchema', reservationSchema)
