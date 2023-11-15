import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//merge
const eventSchema = mongoose.Schema({
  nameEvent: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startEvent: Date,
  endEvent: Date,
  descriptionEvent: String,
  PhotoEvent: {
    type: String,
    default: '',
  },
  addressEvent: String,
  // status: {
  //     type: String,
  //     enum: ['ongoing','' ,'Canceled'],
  //     default: 'ongoing',
  // },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  interested: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface
  going: [{ type: Schema.Types.ObjectId, ref: 'User' }], // later for web scraping interface
});

export default mongoose.model("Event", eventSchema);
