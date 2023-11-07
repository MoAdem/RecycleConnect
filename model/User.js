const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['organization', 'regular'], // Add other roles as needed
    default: 'regular',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
