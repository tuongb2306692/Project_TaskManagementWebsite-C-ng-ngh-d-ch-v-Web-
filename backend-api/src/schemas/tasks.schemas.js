const { z } = require('zod');

const taskIdParamSchema = z.object({
    id: z.coerce
        .number()
        .int('Task ID must be an integer')
        .positive('Task ID must be positive'),
});

const createTaskBodySchema = z.object({
    tl_id: z.coerce
        .number()
        .int('Task list ID must be an integer')
        .positive('Task list ID must be positive'),

    task_title: z
        .string()
        .trim()
        .min(3, 'Task title must be at least 3 characters')
        .max(150, 'Task title must not exceed 150 characters'),

    task_description: z
        .string()
        .trim()
        .max(1000, 'Task description must not exceed 1000 characters')
        .optional()
        .nullable(),

    task_priority: z
        .enum(['Low', 'Medium', 'High'])
        .optional(),

    task_status: z
        .enum(['Todo', 'Doing', 'Done'])
        .optional(),

    task_due_date: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            'Due date must be in YYYY-MM-DD format'
        )
        .optional()
        .nullable(),
});

const updateTaskBodySchema = z
    .object({
        tl_id: z.coerce
            .number()
            .int('Task list ID must be an integer')
            .positive('Task list ID must be positive')
            .optional(),

        task_title: z
            .string()
            .trim()
            .min(3, 'Task title must be at least 3 characters')
            .max(150, 'Task title must not exceed 150 characters')
            .optional(),

        task_description: z
            .string()
            .trim()
            .max(1000, 'Task description must not exceed 1000 characters')
            .optional()
            .nullable(),

        task_priority: z
            .enum(['Low', 'Medium', 'High'])
            .optional(),

        task_status: z
            .enum(['Todo', 'Doing', 'Done'])
            .optional(),

        task_due_date: z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Due date must be in YYYY-MM-DD format'
            )
            .optional()
            .nullable(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    });

const taskFilterQuerySchema = z.object({
    status: z
        .enum(['Todo', 'Doing', 'Done'])
        .optional(),

    priority: z
        .enum(['Low', 'Medium', 'High'])
        .optional(),

    tl_id: z.coerce
        .number()
        .int('Task list ID must be an integer')
        .positive('Task list ID must be positive')
        .optional(),

    overdue: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
});

module.exports = {
    taskIdParamSchema,
    createTaskBodySchema,
    updateTaskBodySchema,
    taskFilterQuerySchema,
};