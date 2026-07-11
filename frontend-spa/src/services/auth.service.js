import api from "./api.service";

class AuthService {
  async register(data) {
    const response = await api.post("/auth/register", data);
    return response.data;
  }

  async login(data) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }
}

export default new AuthService();