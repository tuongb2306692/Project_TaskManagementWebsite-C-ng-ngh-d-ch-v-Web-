const express = require('express');

const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const taskListsController = require('../controllers/task-lists.controller');

const {
    taskListIdParamSchema,
    createTaskListBodySchema,
    updateTaskListBodySchema,
} = require('../schemas/taskLists.schemas');

const router = express.Router();

router.use(authenticate);

router.get('/', taskListsController.getLists);

router.get(
    '/:id',
    validate({
        params: taskListIdParamSchema,
    }),
    taskListsController.getList
);

router.post(
    '/',
    validate({
        body: createTaskListBodySchema,
    }),
    taskListsController.createList
);

router.patch(
    '/:id',
    validate({
        params: taskListIdParamSchema,
        body: updateTaskListBodySchema,
    }),
    taskListsController.updateList
);

router.delete(
    '/:id',
    validate({
        params: taskListIdParamSchema,
    }),
    taskListsController.deleteList
);

module.exports = router;