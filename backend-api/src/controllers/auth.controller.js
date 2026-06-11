const jsend = require('../jsend');

async function register(req, res, next) {
    try {
        const { username, password } = req.body;

        return res.status(201).json(
            jsend.success({
                message: 'Register successfully',
                data: {
                    username,
                },
            })
        );
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { username } = req.body;

        return res.status(200).json(
            jsend.success({
                message: 'Login successfully',
                data: {
                    username,
                },
            })
        );
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
};
