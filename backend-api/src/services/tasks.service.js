const knex = require('../database/knex');

function tasksRepository() {
    return knex('tasks');
}

function toTaskData(payload) {
    const data = {};

    if (payload.tl_id !== undefined) {
        data.tl_id = payload.tl_id;
    }

    if (payload.task_title !== undefined) {
        data.task_title = payload.task_title;
    }

    if (payload.task_description !== undefined) {
        data.task_description = payload.task_description;
    }

    if (payload.task_priority !== undefined) {
        data.task_priority = payload.task_priority;
    }

    if (payload.task_status !== undefined) {
        data.task_status = payload.task_status;
    }

    if (payload.task_due_date !== undefined) {
        data.task_due_date = payload.task_due_date;
    }

    return data;
}

async function isTaskListOwnedByUser(userId, tlId) {
    const taskList = await knex('task_lists')
        .where({
            user_id: userId,
            tl_id: tlId,
        })
        .first();

    return Boolean(taskList);
}

async function find(userId, filters = {}) {
    const query = tasksRepository()
        .select('tasks.*')
        .join('task_lists', 'tasks.tl_id', 'task_lists.tl_id')
        .where('task_lists.user_id', userId);

    if (filters.status) {
        query.where('tasks.task_status', filters.status);
    }

    if (filters.priority) {
        query.where('tasks.task_priority', filters.priority);
    }

    if (filters.tl_id) {
        query.where('tasks.tl_id', filters.tl_id);
    }

    if (filters.overdue === true) {
        query
            .whereNotNull('tasks.task_due_date')
            .where('tasks.task_due_date', '<', knex.raw('CURRENT_DATE'))
            .whereNot('tasks.task_status', 'Done');
    }

    return query.orderBy('tasks.task_id', 'asc');
}

async function findById(userId, taskId) {
    return tasksRepository()
        .select('tasks.*')
        .join('task_lists', 'tasks.tl_id', 'task_lists.tl_id')
        .where('task_lists.user_id', userId)
        .where('tasks.task_id', taskId)
        .first();
}

async function create(userId, payload) {
    const isOwner = await isTaskListOwnedByUser(userId, payload.tl_id);

    if (!isOwner) {
        return null;
    }

    const data = toTaskData(payload);

    const [newTask] = await tasksRepository()
        .insert(data)
        .returning([
            'task_id',
            'task_title',
            'task_description',
            'task_priority',
            'task_status',
            'task_due_date',
            'task_created_at',
            'task_updated_at',
            'tl_id',
        ]);

    return newTask;
}

async function update(userId, taskId, payload) {
    const existingTask = await findById(userId, taskId);

    if (!existingTask) {
        return null;
    }

    if (payload.tl_id !== undefined) {
        const isOwner = await isTaskListOwnedByUser(userId, payload.tl_id);

        if (!isOwner) {
            return null;
        }
    }

    const data = toTaskData(payload);

    const [updatedTask] = await tasksRepository()
        .where({
            task_id: taskId,
        })
        .update({
            ...data,
            task_updated_at: knex.fn.now(),
        })
        .returning([
            'task_id',
            'task_title',
            'task_description',
            'task_priority',
            'task_status',
            'task_due_date',
            'task_created_at',
            'task_updated_at',
            'tl_id',
        ]);

    return updatedTask;
}

async function remove(userId, taskId) {
    const existingTask = await findById(userId, taskId);

    if (!existingTask) {
        return null;
    }

    await tasksRepository()
        .where({
            task_id: taskId,
        })
        .del();

    return existingTask;
}

module.exports = {
    find,
    findById,
    create,
    update,
    remove,
};