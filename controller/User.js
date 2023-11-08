import User from '../model/User.js';

export const createSampleUser = async () => {
  try {
    const sampleUser = new User({
      username: 'testuser1',
      email: 'testuser@example.com1',
      password: 'testpassword1',
      role: 'regular',
    });

    await sampleUser.save();
    console.log('Sample user created successfully');
  } catch (error) {
    console.error('Error creating sample user:', error);
  }
};
