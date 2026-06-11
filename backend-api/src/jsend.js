function success(payload = {}) {
    return {
        success: true,
        ...payload,
    };
}

function fail(payload = {}) {
    return {
        success: false,
        ...payload,
    };
}

module.exports = {
    success,
    fail,
};
