import { defineStore } from "pinia";
import ListService from "@/services/list.service";

export const useListStore = defineStore("list", {
  state: () => ({
    taskLists: [],
    loading: false,
    errorMessage: "",
  }),

  getters: {
    totalLists: (state) => state.taskLists.length,
  },

  actions: {
    async loadTaskLists() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await ListService.getAll();

        this.taskLists = response.data;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Cannot load task lists.";
      } finally {
        this.loading = false;
      }
    },

    async createTaskList(data) {
      await ListService.create(data);

      await this.loadTaskLists();
    },

    async updateTaskList(id, data) {
      await ListService.update(id, data);

      await this.loadTaskLists();
    },

    async deleteTaskList(id) {
      await ListService.delete(id);

      await this.loadTaskLists();
    },
  },
});