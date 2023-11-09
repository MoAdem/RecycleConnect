import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
  // Function to create a new user
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

  // Function to retrieve all users
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

  // Function to get a user by ID
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

  // Function to retrieve all users
  getAllUsers: async (req, res) => {
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
    const token = user.generateAuthToken();
    res.status(200).json({ message: 'Login successful', user: user, token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
}
export default UserController ;
