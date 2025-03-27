const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');


router.post('/register', registerValidation, authController.register);


router.post('/login', loginValidation, authController.login);

router.get('/me', auth, authController.getCurrentUser);

module.exports = router;