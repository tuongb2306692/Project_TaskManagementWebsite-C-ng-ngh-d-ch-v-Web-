const express = require('express');

const authRouter = require('./routes/auth.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'TaskFlow API',
    });
});

app.use('/api/auth', authRouter);

module.exports = app;
