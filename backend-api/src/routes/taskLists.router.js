const express = require('express');

const authenticate = require('../middlewares/auth.middleware');

const taskListsController = require(
    '../controllers/task-lists.controller'
);

const router = express.Router();

router.use(authenticate);

router.get('/', taskListsController.getLists);

router.get('/:id', taskListsController.getList);

router.post('/', taskListsController.createList);

router.patch('/:id', taskListsController.updateList);

router.delete('/:id', taskListsController.deleteList);

module.exports = router;
