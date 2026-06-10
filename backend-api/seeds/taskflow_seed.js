const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

function createTaskList(userId) {
    return {
        user_id: userId,
        tl_name:
            faker.helpers.arrayElement([
                'Study',
                'Personal',
                'Work',
                'Shopping',
                'Project',
            ]) +
            ' ' +
            faker.number.int({ min: 1, max: 99 }),

        tl_description: faker.lorem.sentence(),
    };
}

function createTask(tlId) {
    return {
        tl_id: tlId,

        task_title: faker.lorem.words({
            min: 2,
            max: 5,
        }),

        task_description: faker.lorem.sentences(2),

        task_priority: faker.helpers.arrayElement([
            'Low',
            'Medium',
            'High',
        ]),

        task_status: faker.helpers.arrayElement([
            'Todo',
            'Doing',
            'Done',
        ]),

        task_due_date: faker.date.soon({
            days: 30,
        }),
    };
}

exports.seed = async function (knex) {
    await knex('tasks').del();
    await knex('task_lists').del();
    await knex('users').del();

    const passwordHash = await bcrypt.hash(
        '123456',
        10
    );

    /*
     * USERS
     */

    const users = [];

    for (let i = 0; i < 10; i++) {
        users.push({
            user_username:
                faker.internet.username(),

            user_password_hash:
                passwordHash,
        });
    }

    const insertedUsers = await knex('users')
        .insert(users)
        .returning('user_id');

    /*
     * TASK LISTS
     */

    const taskLists = [];

    insertedUsers.forEach((user) => {
        for (let i = 0; i < 3; i++) {
            taskLists.push(
                createTaskList(user.user_id)
            );
        }
    });

    const insertedLists = await knex('task_lists')
        .insert(taskLists)
        .returning('tl_id');

    /*
     * TASKS
     */

    const tasks = [];

    insertedLists.forEach((list) => {
        for (let i = 0; i < 10; i++) {
            tasks.push(
                createTask(list.tl_id)
            );
        }
    });

    await knex('tasks').insert(tasks);
};