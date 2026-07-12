import { defineStore } from "pinia";
import TaskService from "@/services/task.service";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    loading: false,
    errorMessage: "",
  }),

  getters: {
    totalTasks: (state) => state.tasks.length,

    todoTasks: (state) =>
      state.tasks.filter(
        (task) => task.task_status === "Todo"
      ).length,

    doingTasks: (state) =>
      state.tasks.filter(
        (task) => task.task_status === "Doing"
      ).length,

    doneTasks: (state) =>
      state.tasks.filter(
        (task) => task.task_status === "Done"
      ).length,

    highPriorityTasks: (state) =>
      state.tasks.filter(
        (task) => task.task_priority === "High"
      ).length,
  },

  actions: {
    async loadTasks() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await TaskService.getAll();

        this.tasks = response.data;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Cannot load tasks.";
      } finally {
        this.loading = false;
      }
    },

    async createTask(data) {
      await TaskService.create(data);

      await this.loadTasks();
    },

    async updateTask(id, data) {
      await TaskService.update(id, data);

      await this.loadTasks();
    },

    async deleteTask(id) {
      await TaskService.delete(id);

      await this.loadTasks();
    },
  },
});