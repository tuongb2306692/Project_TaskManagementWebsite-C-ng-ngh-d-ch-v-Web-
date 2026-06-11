const { z } = require('zod');

const registerSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required',
        })
        .trim()
        .min(3, 'Username must be at least 3 characters'),

    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }),

    password: z.string({
    error: (issue) => {
        if (issue.input === undefined) {
            return 'Password is required';
        }

        return 'Invalid password';
    },
    }).min(6, 'Password must be at least 6 characters'),
});

module.exports = {
    registerSchema,
    loginSchema,
};
