import User from "../model/User.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
  //ajout user 
  createUser: async (req, res) => {
    const { username, email, address, password, role } = req.body;

    if (!username || !email || !address || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const newUser = new User({
        username,
        email,
        address,
        password,
        role,
      });

      await newUser.save();

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Affichage 
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'Users not found' });
      }
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

 //affichage by id 
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },


// update 
  updateUser : async (req, res) => {
  const { username, email, address, password, role } = req.body;

  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (address) userFields.address = address;
  if (password) userFields.password = password;
  if (role) userFields.role = role;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},

//delete
 deleteUser : async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},
loginUser: async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    console.log('User found:', user);
    const token = await user.generateAuthToken();
    console.log('Generated token:', token);
    res.status(200).json({ message: 'Login successful', user: user, token: token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
},
//reset password 
forgotPassword: async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //  reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expiration in 1 hour

    await user.save();

    // reset link 
    const resetLink = `http://yourwebsite.com/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},
}
async function sendPasswordResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bouguerrahanine4@gmail.com',
      pass: 'ztpx ozpt ypbf jleo',
    },
  });

  const mailOptions = {
    from: 'bouguerrahanine4@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
}


export default UserController ;
