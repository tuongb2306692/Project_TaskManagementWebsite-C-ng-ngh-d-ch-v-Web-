const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('./routes/auth.router');
const taskListsRouter = require('./routes/taskLists.router');
const tasksRouter = require('./routes/tasks.router');

const apiLimiter = require('./middlewares/rate-limit.middleware');
const openApiSpec = require('./swagger/openapi');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'TaskFlow API',
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/api', apiLimiter);

app.use('/api/auth', authRouter);
app.use('/api/lists', taskListsRouter);
app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
});

app.use((err, req, res, _next) => {
    const statusCode = err.statusCode || err.status || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;