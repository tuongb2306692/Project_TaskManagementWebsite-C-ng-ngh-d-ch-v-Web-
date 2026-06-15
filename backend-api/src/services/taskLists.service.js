const knex = require('../database/knex');

function taskListsRepository() {
    return knex('task_lists');
}

function toTaskListData(payload) {
    const data = {};

    if (payload.tl_name !== undefined) {
        data.tl_name = payload.tl_name;
    }

    if (payload.tl_description !== undefined) {
        data.tl_description = payload.tl_description;
    }

    return data;
}

async function findByUser(userId) {
    return taskListsRepository()
        .where({
            user_id: userId,
        })
        .orderBy('tl_id', 'asc');
}

async function findById(userId, tlId) {
    return taskListsRepository()
        .where({
            user_id: userId,
            tl_id: tlId,
        })
        .first();
}

async function create(userId, payload) {
    const data = toTaskListData(payload);

    const [newTaskList] = await taskListsRepository()
        .insert({
            user_id: userId,
            ...data,
        })
        .returning([
            'tl_id',
            'tl_name',
            'tl_description',
            'tl_created_at',
            'tl_updated_at',
            'user_id',
        ]);

    return newTaskList;
}

async function update(userId, tlId, payload) {
    const data = toTaskListData(payload);

    const [updatedTaskList] = await taskListsRepository()
        .where({
            user_id: userId,
            tl_id: tlId,
        })
        .update({
            ...data,
            tl_updated_at: knex.fn.now(),
        })
        .returning([
            'tl_id',
            'tl_name',
            'tl_description',
            'tl_created_at',
            'tl_updated_at',
            'user_id',
        ]);

    return updatedTaskList;
}

async function remove(userId, tlId) {
    const taskList = await findById(userId, tlId);

    if (!taskList) {
        return null;
    }

    await knex.transaction(async (trx) => {
        await trx('tasks')
            .where({
                tl_id: tlId,
            })
            .del();

        await trx('task_lists')
            .where({
                user_id: userId,
                tl_id: tlId,
            })
            .del();
    });

    return taskList;
}

module.exports = {
    findByUser,
    findById,
    create,
    update,
    remove,
};