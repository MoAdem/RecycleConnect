import express from 'express';
const router = express.Router();
import User from '../model/User.js';

// Route to create a sample user
router.post('/createSampleUser', async (req, res) => {
  try {
    const sampleUser = new User({
      username: 'testuser4',
      email: 'testuserf@example.com',
      password: 'testpasswordf',
      role: 'regular',
    });

    await sampleUser.save();
    res.status(201).json({ success: true, user: sampleUser });
  } catch (error) {
    console.error('Error creating sample user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
