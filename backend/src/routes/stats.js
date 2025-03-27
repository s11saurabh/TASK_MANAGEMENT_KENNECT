const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const auth = require('../middleware/auth');

router.use(auth);


router.get('/', statsController.getStats);

module.exports = router;