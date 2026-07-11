import api from "./api.service";

class ListService {
  async getAll() {
    const response = await api.get("/lists");
    return response.data;
  }

  async create(data) {
    const response = await api.post("/lists", data);
    return response.data;
  }

  async get(id) {
    const response = await api.get(`/lists/${id}`);
    return response.data;
  }

  async update(id, data) {
    const response = await api.patch(`/lists/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/lists/${id}`);
    return response.data;
  }
}

export default new ListService();