import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("accessToken") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    username: (state) =>
      state.user?.user_username || "User",
  },

  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "accessToken",
        token
      );
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});