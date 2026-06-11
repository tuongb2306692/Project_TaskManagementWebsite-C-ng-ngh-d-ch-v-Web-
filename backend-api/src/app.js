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
app.use((err, req, res, next) => {
    return res.status(400).json({
        success: false,
        message: err.message,
    });
});
module.exports = app;



