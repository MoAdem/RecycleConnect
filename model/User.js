import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['organization', 'client'], 
    default: 'client',
  },
  org_name: {
    type: String,
    required: function() {
      return this.role === 'organization';
    },
  },
  org_description: {
    type: String,
    required: function() {
      return this.role === 'organization';
    },
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'your_secret_key');
  return token;
};

userSchema.statics.findByCredentials = async function(username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
