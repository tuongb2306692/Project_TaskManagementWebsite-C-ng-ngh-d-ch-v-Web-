const jsend = require('../jsend');
const authService = require('../services/auth.service');

async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);

        return res.status(201).json(
            jsend.success({
                message: 'Register successfully',
                data: user,
            })
        );
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const result = await authService.login(req.body);

        return res.status(200).json(
            jsend.success({
                message: 'Login successfully',
                data: result,
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
