const express = require('express');

const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const tasksController = require('../controllers/tasks.controller');

const {
    taskIdParamSchema,
    createTaskBodySchema,
    updateTaskBodySchema,
    taskFilterQuerySchema,
} = require('../schemas/tasks.schemas');

const router = express.Router();

router.use(authenticate);

router.get(
    '/',
    validate({
        query: taskFilterQuerySchema,
    }),
    tasksController.getTasks
);

router.get(
    '/:id',
    validate({
        params: taskIdParamSchema,
    }),
    tasksController.getTask
);

router.post(
    '/',
    validate({
        body: createTaskBodySchema,
    }),
    tasksController.createTask
);

router.patch(
    '/:id',
    validate({
        params: taskIdParamSchema,
        body: updateTaskBodySchema,
    }),
    tasksController.updateTask
);

router.delete(
    '/:id',
    validate({
        params: taskIdParamSchema,
    }),
    tasksController.deleteTask
);

module.exports = router;