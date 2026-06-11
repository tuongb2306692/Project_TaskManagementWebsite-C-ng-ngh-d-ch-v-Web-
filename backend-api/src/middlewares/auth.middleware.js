const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header is required',
            });
        }

        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authorization format',
            });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is required',
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
}

module.exports = authenticate;
