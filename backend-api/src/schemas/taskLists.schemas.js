const { z } = require('zod');

const taskListIdParamSchema = z.object({
    id: z.coerce
        .number()
        .int('Task list ID must be an integer')
        .positive('Task list ID must be positive'),
});

const createTaskListBodySchema = z.object({
    tl_name: z
        .string()
        .trim()
        .min(3, 'Task list name must be at least 3 characters')
        .max(100, 'Task list name must not exceed 100 characters'),

    tl_description: z
        .string()
        .trim()
        .max(500, 'Description must not exceed 500 characters')
        .optional()
        .nullable(),
});

const updateTaskListBodySchema = z
    .object({
        tl_name: z
            .string()
            .trim()
            .min(3, 'Task list name must be at least 3 characters')
            .max(100, 'Task list name must not exceed 100 characters')
            .optional(),

        tl_description: z
            .string()
            .trim()
            .max(500, 'Description must not exceed 500 characters')
            .optional()
            .nullable(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    });

module.exports = {
    taskListIdParamSchema,
    createTaskListBodySchema,
    updateTaskListBodySchema,
};