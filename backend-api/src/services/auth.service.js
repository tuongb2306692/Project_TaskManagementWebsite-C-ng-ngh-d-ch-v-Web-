const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');

const SALT_ROUNDS = 10;

async function register(payload) {
    const existingUser = await knex('users')
        .where({
            user_username: payload.username,
        })
        .first();

    if (existingUser) {
        throw new ApiError(400, 'Username already exists');
    }

    const passwordHash = await bcrypt.hash(
        payload.password,
        SALT_ROUNDS
    );

    const [user] = await knex('users')
        .insert({
            user_username: payload.username,
            user_password_hash: passwordHash,
        })
        .returning([
            'user_id',
            'user_username',
            'user_created_at',
        ]);

    return user;
}

async function login(payload) {
    const user = await knex('users')
        .where({
            user_username: payload.username,
        })
        .first();

    if (!user) {
        throw new ApiError(401, 'Invalid username or password');
    }

    const isMatched = await bcrypt.compare(
        payload.password,
        user.user_password_hash
    );

    if (!isMatched) {
        throw new ApiError(401, 'Invalid username or password');
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            username: user.user_username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
    );

    return {
        token,
        user: {
            user_id: user.user_id,
            user_username: user.user_username,
        },
    };
}

module.exports = {
    register,
    login,
};