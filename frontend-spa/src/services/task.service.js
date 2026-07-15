import api from './api.service';

class TaskService {
    async getAll(params = {}) {
        const response = await api.get('/tasks', { params });
        return response.data.data;
    }

    async create(data) {
        const response = await api.post('/tasks', data);
        return response.data.data;
    }

    async get(id) {
        const response = await api.get(`/tasks/${id}`);
        return response.data.data;
    }

    async update(id, data) {
        const response = await api.patch(`/tasks/${id}`, data);
        return response.data.data;
    }

    async delete(id) {
        const response = await api.delete(`/tasks/${id}`);
        return response.data.data;
    }
}

export default new TaskService();