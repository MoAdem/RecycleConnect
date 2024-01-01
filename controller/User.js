import User from "../model/User.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserController = {
//ajout user
createUser: async (req, res) => {
const { username, email, address,telephone, password, role } = req.body;


if (!username || !email || !address || !password  || !role) {
return res.status(400).json({ error: 'All fields are required' });
}


try {
let existingUser = await User.findOne({ username });
if (existingUser) {
return res.status(400).json({ error: 'User already exists' });
}


const newUser = new User({
username,
email,
address,
password,
telephone,
role,
});


await newUser.save();


res.status(201).json({ message: 'User created successfully', user: newUser });
} catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
},
// add organisation
createORG: async (req, res) => {
const { username, email, address,telephone, password, role ,org_description} = req.body;


if (!username || !email || !address || !password || !telephone || !role || !org_description) {
return res.status(400).json({ error: 'All fields are required' });
}


try {
let existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ error: 'organization already exists' });
}


const newUser = new User({
username,
email,
address,
password,
telephone,
org_description,
role,
});


await newUser.save();


res.status(201).json({ message: 'organization created successfully', user: newUser });
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

banUser: async (req, res) => {
    const userId = req.params.id; 

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.isBanned = true; 
      
      await user.save();

      res.status(200).json({ message: 'User banned successfully', user });
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

    if (user.isBanned) {
      return res.status(403).json({ error: 'User is banned. Cannot login' });
    }

    const token = await user.generateAuthToken();
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
},

loginAdmin: async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByCredentials(username, password);

    if (user.role !== 'admin') {
      throw new Error('Access denied. Only admin users are allowed.');
    }

    if (user.isBanned) {
      throw new Error('Admin user is banned. Cannot login.');
    }

    const token = await user.generateAuthToken();
    console.log('Generated token:', token);
    res.status(200).json({ message: 'Admin login successful', user, token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(401).json({ error: error.message });
  }
},

createAdmin: async (req, res) => {
  const { username, email, password, role } = req.body;
  
  
  if (!username || !email || !password  || !role) {
  return res.status(400).json({ error: 'All fields are required' });
  }
  
  
  try {
  let existingUser = await User.findOne({ email });
  if (existingUser) {
  return res.status(400).json({ error: 'admin already exists' });
  }
  
  
  const newUser = new User({
  username,
  email,
  password,
  role,
  });
  
  
  await newUser.save();
  
  
  res.status(201).json({ message: 'Admin created successfully', user: newUser });
  } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
  }
  },




sendActivationCode: async (req, res) => {
  try {
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    const email = req.body.email;
    const user = await User.findOne({ email });
    const username = user.username;

    const htmlString = `
      <body style='font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;'>
        <table width='100%' cellpadding='0' style='max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
          <tr>
            <td style='padding: 20px;'>
              <h2 style='color: #333;'>Activation Code Email</h2>
              <p>Dear ${username},</p>
              <p>Your activation code is: <strong style='color: #009688;'>${resetCode}</strong></p>
              <p>Please use this code to reset your password.</p>
              <p>If you did not request this code, please disregard this email.</p>
              <p>Thank you!</p>
            </td>
          </tr>
        </table>
      </body>
    `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
      },
    });
    transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: req.body.email,
      subject: "Your Activation Code ✔",
      html: htmlString,
    });

    await User.updateOne({
      email: req.body.email
    }, {
      resetCode: resetCode
    });

    res.status(200).json({ email: req.body.email, resetCode });
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
},

verifyCode: async (req, res) => {
  const { resetCode, email } = req.body;
  const user = await User.findOne({ email });

  if (resetCode === user.resetCode) {
    res.status(200).json({ message: 'true' });
  } else {
    res.status(200).json({ message: 'false' });
  }
},

forgotPassword: async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  const user = await User.findOne({ email });

  if (newPassword === confirmPassword) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    try {
      await User.updateOne({ _id: user._id }, { password: hashedPassword });
      res.status(200).json({ data: req.body });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(500).json({ message: "Passwords don't match" });
  }
},

changePassword: async (req, res) => {
  const { email, newPassword, confirmPassword, oldPassword } = req.body;

  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(oldPassword, user.password)) {
    if (newPassword === confirmPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      try {
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ data: req.body });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(200).json({ response: "Passwords don't match" });
    }
  } else {
    res.status(500).json({ message: "Email or password don't match" });
  }
},
};
export default UserController ;










