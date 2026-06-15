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

            headers: {
                CacheControl: {
                    description:
                        'Caching policy for this response. The API uses private caching because task data belongs to the authenticated user.',
                    schema: {
                        type: 'string',
                        example: 'private, max-age=60, must-revalidate',
                    },
                },

                ETag: {
                    description:
                        'Entity tag generated from the JSON response body. The client can send this value back through If-None-Match.',
                    schema: {
                        type: 'string',
                        example: '"9b74c9897bac770ffc029102a200c5de"',
                    },
                },

                VaryAuthorization: {
                    description:
                        'Indicates that cached responses vary by Authorization header.',
                    schema: {
                        type: 'string',
                        example: 'Authorization',
                    },
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
                            example: 'Internal Server Error',
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

                RegisterResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                        },
                        message: {
                            type: 'string',
                            example: 'Register successfully',
                        },
                        data: {
                            $ref: '#/components/schemas/User',
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
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/RegisterResponse',
                                    },
                                },
                            },
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
                        429: {
                            description: 'Too many requests',
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
                        429: {
                            description: 'Too many requests',
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
                    description:
                        'Returns all task lists of the authenticated user. This endpoint supports HTTP caching using Cache-Control, ETag and If-None-Match. If the client sends a matching If-None-Match value, the server returns 304 Not Modified.',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'If-None-Match',
                            in: 'header',
                            required: false,
                            description:
                                'ETag value received from a previous successful response. If it matches the current response ETag, the server returns 304 Not Modified.',
                            schema: {
                                type: 'string',
                                example:
                                    '"9b74c9897bac770ffc029102a200c5de"',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get task lists successfully',
                            headers: {
                                'Cache-Control': {
                                    $ref: '#/components/headers/CacheControl',
                                },
                                ETag: {
                                    $ref: '#/components/headers/ETag',
                                },
                                Vary: {
                                    $ref: '#/components/headers/VaryAuthorization',
                                },
                            },
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
                        304: {
                            description:
                                'Not Modified. The cached task lists response is still valid, so the server does not return a response body.',
                            headers: {
                                'Cache-Control': {
                                    $ref: '#/components/headers/CacheControl',
                                },
                                ETag: {
                                    $ref: '#/components/headers/ETag',
                                },
                                Vary: {
                                    $ref: '#/components/headers/VaryAuthorization',
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                        429: {
                            description: 'Too many requests',
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
                                                    'Task list created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/TaskList',
                                            },
                                        },
                                    },
                                },
                            },
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
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                        429: {
                            description: 'Too many requests',
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
                                                    'Get task list successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/TaskList',
                                            },
                                        },
                                    },
                                },
                            },
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
                        404: {
                            description: 'Task list not found',
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
                                                    'Task list updated successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/TaskList',
                                            },
                                        },
                                    },
                                },
                            },
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
                                                    'Task list deleted successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/TaskList',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Validation failed',
                        },
                        401: {
                            description: 'Unauthorized',
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
                    description:
                        'Returns tasks of the authenticated user. This endpoint supports filtering and HTTP caching using Cache-Control, ETag and If-None-Match. If the client sends a matching If-None-Match value, the server returns 304 Not Modified.',
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
                            description:
                                'Filter tasks by task list ID. This project database uses tl_id as the foreign key.',
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
                        {
                            name: 'If-None-Match',
                            in: 'header',
                            required: false,
                            description:
                                'ETag value received from a previous successful response. If it matches the current response ETag, the server returns 304 Not Modified.',
                            schema: {
                                type: 'string',
                                example:
                                    '"9b74c9897bac770ffc029102a200c5de"',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Get tasks successfully',
                            headers: {
                                'Cache-Control': {
                                    $ref: '#/components/headers/CacheControl',
                                },
                                ETag: {
                                    $ref: '#/components/headers/ETag',
                                },
                                Vary: {
                                    $ref: '#/components/headers/VaryAuthorization',
                                },
                            },
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
                        304: {
                            description:
                                'Not Modified. The cached tasks response is still valid, so the server does not return a response body.',
                            headers: {
                                'Cache-Control': {
                                    $ref: '#/components/headers/CacheControl',
                                },
                                ETag: {
                                    $ref: '#/components/headers/ETag',
                                },
                                Vary: {
                                    $ref: '#/components/headers/VaryAuthorization',
                                },
                            },
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
                        429: {
                            description: 'Too many requests',
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
                                                    'Task created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Task',
                                            },
                                        },
                                    },
                                },
                            },
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
                        404: {
                            description: 'Task list not found',
                        },
                        429: {
                            description: 'Too many requests',
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
                                                    'Get task successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Task',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Validation failed',
                        },
                        401: {
                            description: 'Unauthorized',
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
                                                    'Task updated successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Task',
                                            },
                                        },
                                    },
                                },
                            },
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
                                                    'Task deleted successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Task',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Validation failed',
                        },
                        401: {
                            description: 'Unauthorized',
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