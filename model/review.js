import mongoose from "mongoose";
const {Schema,model}= mongoose;

const reviewSchema = new Schema({
  Note: 
  {type: Number,
  required: true,},
  Avis: String,
  Article: { type: Schema.Types.ObjectId, ref: 'Article' },
});

export default model('Review', reviewSchema);
