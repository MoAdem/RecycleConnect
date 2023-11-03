const mongoose = require('mongoose');
const Schema = mongoose.Schema
const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    start:Date,
    end:Date,
    description: String,
    address: String,
    // status: {
    //     type: String,
    //     enum: ['ongoing','' ,'Canceled'],
    //     default: 'ongoing',
    // },
    organizer: { type: Schema.Types.ObjectId, ref: 'user' },
    interested: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface
    going: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface

})

module.exports = mongoose.model("Event",eventSchema);
