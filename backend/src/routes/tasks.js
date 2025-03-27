const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { taskValidation } = require('../middleware/validation');


router.use(auth);


router.get('/', taskController.getTasks);


router.post('/', taskValidation, taskController.createTask);

router.get('/:id', taskController.getTask);


router.put('/:id', taskValidation, taskController.updateTask);


router.delete('/:id', taskController.deleteTask);

module.exports = router;