const mongoose = require('mongoose');
const Schema = mongoose.Schema
//merge
const eventSchema = mongoose.Schema({
    nameEvent: {
        type: String,
        required: true,
        unique: true,
    },
    startEvent:Date,
    endEvent:Date,
    descriptionEvent: String,
    PhotoEvent: [],
    addressEvent: String,
    // status: {
    //     type: String,
    //     enum: ['ongoing','' ,'Canceled'],
    //     default: 'ongoing',
    // },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
    interested: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface
    going: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface

})

module.exports = mongoose.model("Event",eventSchema);
