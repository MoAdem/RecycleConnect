import mongoose from 'mongoose';
//entité user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  address: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['organization', 'client'], // Add other roles as needed
    default: 'client',
  },
});

const User = mongoose.model('User', userSchema);
export default User;
