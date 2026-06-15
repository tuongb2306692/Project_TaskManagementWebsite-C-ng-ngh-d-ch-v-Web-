const crypto = require('crypto');

function createETag(payload) {
    const content = JSON.stringify(payload);

    const hash = crypto
        .createHash('sha1')
        .update(content)
        .digest('hex');

    return `"${hash}"`;
}

function sendCachedJson(req, res, statusCode, payload) {
    const etag = createETag(payload);

    res.set('Cache-Control', 'private, max-age=60, must-revalidate');
    res.set('ETag', etag);
    res.set('Vary', 'Authorization');

    const clientETag = req.headers['if-none-match'];

    if (clientETag === etag) {
        return res.status(304).end();
    }

    return res.status(statusCode).json(payload);
}

module.exports = {
    sendCachedJson,
};