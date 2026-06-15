const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TaskFlow API',
            version: '1.0.0',
            description:
                'REST API documentation for TaskFlow Personal Task Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server',
            },
        ],
        tags: [
            {
                name: 'Authentication',
                description: 'Register and login APIs',
            },
            {
                name: 'Task Lists',
                description: 'CRUD APIs for task lists',
            },
            {
                name: 'Tasks',
                description: 'CRUD and filter APIs for tasks',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },

            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Validation failed',
                        },
                    },
                },

                ValidationErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Validation failed',
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: {
                                        type: 'string',
                                        example: 'task_title',
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Task title must be at least 3 characters',
                                    },
                                },
                            },
                        },
                    },
                },

                RegisterRequest: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            example: 'duy',
                        },
                        password: {
                            type: 'string',
                            example: '123456',
                        },
                    },
                },

                LoginRequest: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            example: 'duy',
                        },
                        password: {
                            type: 'string',
                            example: '123456',
                        },
                    },
                },

                User: {
                    type: 'object',
                    properties: {
                        user_id: {
                            type: 'integer',
                            example: 1,
                        },
                        user_username: {
                            type: 'string',
                            example: 'duy',
                        },
                        user_created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-06-15T10:00:00.000Z',
                        },
                    },
                },

                LoginResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                        },
                        message: {
                            type: 'string',
                            example: 'Login successfully',
                        },
                        data: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                    example:
                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                                user: {
                                    type: 'object',
                                    properties: {
                                        user_id: {
                                            type: 'integer',
                                            example: 1,
                                        },
                                        user_username: {
                                            type: 'string',
                                            example: 'duy',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

                TaskList: {
                    type: 'object',
                    properties: {
                        tl_id: {
                            type: 'integer',
                            example: 1,
                        },
                        tl_name: {
                            type: 'string',
                            example: 'CT313H Project',
                        },
                        tl_description: {
                            type: 'string',
                            nullable: true,
                            example: 'Tasks for Web Technologies project',
                        },
                        tl_created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-06-15T10:00:00.000Z',
                        },
                        tl_updated_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-06-15T10:00:00.000Z',
                        },
                        user_id: {
                            type: 'integer',
                            example: 1,
                        },
                    },
                },

                CreateTaskListRequest: {
                    type: 'object',
                    required: ['tl_name'],
                    properties: {
                        tl_name: {
                            type: 'string',
                            example: 'CT313H Project',
                        },
                        tl_description: {
                            type: 'string',
                            nullable: true,
                            example: 'Tasks for Web Technologies project',
                        },
                    },
                },

                UpdateTaskListRequest: {
                    type: 'object',
                    properties: {
                        tl_name: {
                            type: 'string',
                            example: 'CT313H Final Project',
                        },
                        tl_description: {
                            type: 'string',
                            nullable: true,
                            example: 'Updated task list description',
                        },
                    },
                },

                Task: {
                    type: 'object',
                    properties: {
                        task_id: {
                            type: 'integer',
                            example: 1,
                        },
                        task_title: {
                            type: 'string',
                            example: 'Write REST API report',
                        },
                        task_description: {
                            type: 'string',
                            nullable: true,
                            example:
                                'Describe authentication, CRUD, validation and Swagger',
                        },
                        task_priority: {
                            type: 'string',
                            enum: ['Low', 'Medium', 'High'],
                            example: 'High',
                        },
                        task_status: {
                            type: 'string',
                            enum: ['Todo', 'Doing', 'Done'],
                            example: 'Todo',
                        },
                        task_due_date: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: '2026-06-20',
                        },
                        task_created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-06-15T10:00:00.000Z',
                        },
                        task_updated_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-06-15T10:00:00.000Z',
                        },
                        tl_id: {
                            type: 'integer',
                            example: 1,
                        },
                    },
                },

                CreateTaskRequest: {
                    type: 'object',
                    required: ['tl_id', 'task_title'],
                    properties: {
                        tl_id: {
                            type: 'integer',
                            example: 1,
                        },
                        task_title: {
                            type: 'string',
                            example: 'Write REST API report',
                        },
                        task_description: {
                            type: 'string',
                            nullable: true,
                            example:
                                'Describe authentication, CRUD, validation and Swagger',
                        },
                        task_priority: {
                            type: 'string',
                            enum: ['Low', 'Medium', 'High'],
                            example: 'High',
                        },
                        task_status: {
                            type: 'string',
                            enum: ['Todo', 'Doing', 'Done'],
                            example: 'Todo',
                        },
                        task_due_date: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: '2026-06-20',
                        },
                    },
                },

                UpdateTaskRequest: {
                    type: 'object',
                    properties: {
                        tl_id: {
                            type: 'integer',
                            example: 1,
                        },
                        task_title: {
                            type: 'string',
                            example: 'Update REST API report',
                        },
                        task_description: {
                            type: 'string',
                            nullable: true,
                            example: 'Updated task description',
                        },
                        task_priority: {
                            type: 'string',
                            enum: ['Low', 'Medium', 'High'],
                            example: 'Medium',
                        },
                        task_status: {
                            type: 'string',
                            enum: ['Todo', 'Doing', 'Done'],
                            example: 'Doing',
                        },
                        task_due_date: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: '2026-06-22',
                        },
                    },
                },
            },
        },

        paths: {
            '/api/auth/register': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Register a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/RegisterRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Register successfully',
                        },
                        400: {
                            description: 'Validation failed or username exists',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
            },

            '/api/auth/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Login and receive JWT token',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/LoginRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Login successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/LoginResponse',
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Invalid username or password',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
            },

            '/api/lists': {
                get: {
                    tags: ['Task Lists'],
                    summary: 'Get all task lists of current user',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get task lists successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                example: true,
                                            },
                                            message: {
                                                type: 'string',
                                                example:
                                                    'Get task lists successfully',
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/TaskList',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                        },
                    },
                },

                post: {
                    tags: ['Task Lists'],
                    summary: 'Create a new task list',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateTaskListRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Task list created successfully',
                        },
                        400: {
                            description: 'Validation failed',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ValidationErrorResponse',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                        },
                    },
                },
            },

            '/api/lists/{id}': {
                get: {
                    tags: ['Task Lists'],
                    summary: 'Get task list by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get task list successfully',
                        },
                        404: {
                            description: 'Task list not found',
                        },
                    },
                },

                patch: {
                    tags: ['Task Lists'],
                    summary: 'Update task list by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UpdateTaskListRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Task list updated successfully',
                        },
                        404: {
                            description: 'Task list not found',
                        },
                    },
                },

                delete: {
                    tags: ['Task Lists'],
                    summary: 'Delete task list by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Task list deleted successfully',
                        },
                        404: {
                            description: 'Task list not found',
                        },
                    },
                },
            },

            '/api/tasks': {
                get: {
                    tags: ['Tasks'],
                    summary: 'Get tasks with optional filters',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'status',
                            in: 'query',
                            required: false,
                            schema: {
                                type: 'string',
                                enum: ['Todo', 'Doing', 'Done'],
                            },
                            example: 'Todo',
                        },
                        {
                            name: 'priority',
                            in: 'query',
                            required: false,
                            schema: {
                                type: 'string',
                                enum: ['Low', 'Medium', 'High'],
                            },
                            example: 'High',
                        },
                        {
                            name: 'tl_id',
                            in: 'query',
                            required: false,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                        {
                            name: 'overdue',
                            in: 'query',
                            required: false,
                            schema: {
                                type: 'string',
                                enum: ['true', 'false'],
                            },
                            example: 'true',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get tasks successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                example: true,
                                            },
                                            message: {
                                                type: 'string',
                                                example:
                                                    'Get tasks successfully',
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Task',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

                post: {
                    tags: ['Tasks'],
                    summary: 'Create a new task',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateTaskRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Task created successfully',
                        },
                        400: {
                            description: 'Validation failed',
                        },
                        404: {
                            description: 'Task list not found',
                        },
                    },
                },
            },

            '/api/tasks/{id}': {
                get: {
                    tags: ['Tasks'],
                    summary: 'Get task by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get task successfully',
                        },
                        404: {
                            description: 'Task not found',
                        },
                    },
                },

                patch: {
                    tags: ['Tasks'],
                    summary: 'Update task by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UpdateTaskRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Task updated successfully',
                        },
                        400: {
                            description: 'Validation failed',
                        },
                        404: {
                            description: 'Task not found',
                        },
                    },
                },

                delete: {
                    tags: ['Tasks'],
                    summary: 'Delete task by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            example: 1,
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Task deleted successfully',
                        },
                        404: {
                            description: 'Task not found',
                        },
                    },
                },
            },
        },
    },
    apis: [],
};

const openApiSpec = swaggerJSDoc(options);

module.exports = openApiSpec;