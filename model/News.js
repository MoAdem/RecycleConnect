
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the News schema
const newsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  newsPhoto: [],
  description: String,
  url: {
    type: String,
  },
  source: {
    type: String,
  },
   Date: String
});

// Create the News model
const News = mongoose.model('News', newsSchema);

export default News;
