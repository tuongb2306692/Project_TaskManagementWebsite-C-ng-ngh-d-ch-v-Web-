const express = require('express');

const authenticate = require('../middlewares/auth.middleware');

const tasksController = require(
    '../controllers/tasks.controller'
);

const router = express.Router();

router.use(authenticate);

router.get('/', tasksController.getTasks);

router.get('/:id', tasksController.getTask);

router.post('/', tasksController.createTask);

router.patch('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;
