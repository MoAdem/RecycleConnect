import User from "../model/User.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';

const accountSid = 'AC3a218b4a1c68a35300afcb50e53f9eb4';
const authToken = '32a265158079b53eb347d530674fa6fe';
const twilioPhone = '93150160';
const client = twilio(accountSid, authToken);

const UserController = {
  //ajout user (signUp)
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

//login 

loginUser: async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    console.log('User found:', user);
    const token = await user.generateAuthToken();
    console.log('Generated token:', token);

    res.status(200).json({ message: 'Login successful', user: user, token: token });
    console.log(user)
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
},
updatePassword: async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
    const randomPassword = Math.random().toString(36).slice(-8); // Generate an 8-character random password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    user.password = hashedPassword;
    await user.save();
   
    const resetEmail = `Your new password is: ${randomPassword}`;
    await sendPasswordResetEmail(email, resetEmail);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},

}

async function sendPasswordResetEmail(email, resetEmail) {
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
    html: `<p>${resetEmail}</p></p>`,
  };

  return transporter.sendMail(mailOptions);
}





export default UserController ;
