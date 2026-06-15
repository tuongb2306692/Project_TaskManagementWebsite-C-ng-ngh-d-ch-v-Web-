const express = require('express');

const authRouter = require('./routes/auth.router');
const taskListsRouter = require('./routes/taskLists.router');
const tasksRouter = require('./routes/tasks.router');

const apiLimiter = require('./middlewares/rate-limit.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'TaskFlow API',
    });
});


app.use('/api', apiLimiter);

app.use('/api/auth', authRouter);
app.use('/api/lists', taskListsRouter);
app.use('/api/tasks', tasksRouter);

app.use((err, req, res, _next) => {
    return res.status(400).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;