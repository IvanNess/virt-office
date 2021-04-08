const mongoose = require('mongoose')

const receiptSchema = new mongoose.Schema({
    paymentIntent: String,
    receiptUrl: String,
})

module.exports = mongoose.models.Receipt || mongoose.model('Receipt', receiptSchema)