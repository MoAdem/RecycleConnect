const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    start:Date,
    end:Date,
    description: String,
    address: String,
    organizer: { type: Schema.Types.ObjectId, ref: 'Organization' },
    interested: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface
    going: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface

})

const Event = mongoose.model("Event",eventSchema);
module.exports = Event ;