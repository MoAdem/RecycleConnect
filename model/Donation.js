const mongoose = require('mongoose');

const donationSchema = new Schema({
    date: { 
        type: Date,
        default: Date.now 
    },
    
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Processed', 'Cancelled'],
    //     default: 'Pending',
    // },

    isAnonymous: { type: Boolean, default: false }, 
    donor: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    paymentMethod: String, // Payment method (carte bancaire, paypal ..)
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }], 
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' }, 
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    
  })

const Donation = mongoose.model("Donation",donationSchema);
module.exports = Donation ;