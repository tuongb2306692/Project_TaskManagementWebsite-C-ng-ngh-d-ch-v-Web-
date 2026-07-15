import axios from 'axios';

const cache = new Map();

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if ((config.method || 'get').toLowerCase() === 'get') {
        const key = api.getUri(config);
        const cached = cache.get(key);

        config.cacheKey = key;

        if (cached?.etag) {
            config.headers['If-None-Match'] = cached.etag;
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        const key = response.config.cacheKey;
        const etag = response.headers.etag;

        if (key && etag) {
            cache.set(key, {
                etag,
                data: response.data,
            });
        }

        return response;
    },
    (error) => {
        const response = error.response;
        const key = response?.config?.cacheKey;

        if (response?.status === 304 && cache.has(key)) {
            return Promise.resolve({
                ...response,
                status: 200,
                data: cache.get(key).data,
            });
        }

        return Promise.reject(error);
    }
);

export default api;