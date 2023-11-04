const mongoose = require('mongoose');
const Schema = mongoose.Schema
const donationSchema = mongoose.Schema({
    dateDonation: { 
        type: Date,
        default: Date.now 
    },
    
    // statusDontaion: {
    //     type: String,
    //     enum: ['Pending', 'Processed', 'Cancelled'],
    //     default: 'Pending',
    // },

    isAnonymous: { type: Boolean, default: false }, 
    donor: { type: Schema.Types.ObjectId, ref: 'User' },
    amountDonation: Number,
    paymentMethod: String, // Payment method (carte bancaire, paypal ..)
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }], 
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' }, 
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    
  })

  module.exports = mongoose.model("Donation",donationSchema);