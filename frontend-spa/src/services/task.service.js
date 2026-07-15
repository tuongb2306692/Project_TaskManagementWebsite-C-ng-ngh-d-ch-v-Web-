import api from './api.service';

function cleanPayload(data) {
    return {
        ...data,
        task_description:
            data.task_description === '' ? null : data.task_description,
        task_due_date:
            data.task_due_date === '' ? null : data.task_due_date,
    };
}

class TaskService {
    async getAll(params = {}) {
        const response = await api.get('/tasks', { params });
        return response.data.data;
    }

    async create(data) {
        const response = await api.post('/tasks', cleanPayload(data));
        return response.data.data;
    }

    async get(id) {
        const response = await api.get(`/tasks/${id}`);
        return response.data.data;
    }

    async update(id, data) {
        const response = await api.patch(`/tasks/${id}`, cleanPayload(data));
        return response.data.data;
    }

    async delete(id) {
        const response = await api.delete(`/tasks/${id}`);
        return response.data.data;
    }
}

export default new TaskService();