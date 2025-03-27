const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const authController = {
  
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }

      user = new User({
        name,
        email,
        password
      });

      await user.save();


      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          },
          token
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        message: 'Server error during registration',
        error: error.message
      });
    }
  },


  login: async (req, res) => {
    try {
      const { email, password } = req.body;

   
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }


      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }


      const token = generateToken(user._id);

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Server error during login',
        error: error.message
      });
    }
  },


  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        message: 'Server error while fetching user',
        error: error.message
      });
    }
  }
};

module.exports = authController;