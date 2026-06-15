const jsend = require('../jsend');
const taskListsService = require('../services/taskLists.service');

async function getLists(req, res, next) {
    try {
        const taskLists = await taskListsService.findByUser(
            req.user.user_id
        );

        return res.status(200).json(
            jsend.success({
                message: 'Get task lists successfully',
                data: taskLists,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function getList(req, res, next) {
    try {
        const taskList = await taskListsService.findById(
            req.user.user_id,
            req.params.id
        );

        if (!taskList) {
            return res.status(404).json({
                success: false,
                message: 'Task list not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Get task list successfully',
                data: taskList,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function createList(req, res, next) {
    try {
        const taskList = await taskListsService.create(
            req.user.user_id,
            req.body
        );

        return res.status(201).json(
            jsend.success({
                message: 'Task list created successfully',
                data: taskList,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function updateList(req, res, next) {
    try {
        const taskList = await taskListsService.update(
            req.user.user_id,
            req.params.id,
            req.body
        );

        if (!taskList) {
            return res.status(404).json({
                success: false,
                message: 'Task list not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Task list updated successfully',
                data: taskList,
            })
        );
    } catch (error) {
        return next(error);
    }
}

async function deleteList(req, res, next) {
    try {
        const taskList = await taskListsService.remove(
            req.user.user_id,
            req.params.id
        );

        if (!taskList) {
            return res.status(404).json({
                success: false,
                message: 'Task list not found',
            });
        }

        return res.status(200).json(
            jsend.success({
                message: 'Task list deleted successfully',
                data: taskList,
            })
        );
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getLists,
    getList,
    createList,
    updateList,
    deleteList,
};