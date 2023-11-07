const User = require('../model/User');

exports.createSampleUser = async () => {
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
  