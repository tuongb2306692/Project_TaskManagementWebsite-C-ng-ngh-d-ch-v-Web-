const jsend = require('../jsend');
const tasksService = require('../services/tasks.service');
const { sendCachedJson } = require('../utils/http-cache');
async function getTasks(req, res, next) {
    try {
        const tasks = await tasksService.find(
            req.user.user_id,
            req.query
        );

        const responseBody = jsend.success({
            message: 'Get tasks successfully',
            data: tasks,
        });

        return sendCachedJson(req, res, 200, responseBody);
    } catch (error) {
        return next(error);
    }
}

async function getTask(req, res, next) {
    try {
        const task = await tasksService.findById(
            req.user.user_id,
            req.params.id
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Get task successfully',
                data: task,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const task = await tasksService.create(
            req.user.user_id,
            req.body
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task list not found',
            });
        }

        return res.status(201).json(
            jsend.success({
                message: 'Task created successfully',
                data: task,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const task = await tasksService.update(
            req.user.user_id,
            req.params.id,
            req.body
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Task updated successfully',
                data: task,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const task = await tasksService.remove(
            req.user.user_id,
            req.params.id
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Task deleted successfully',
                data: task,
            })
        );
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};