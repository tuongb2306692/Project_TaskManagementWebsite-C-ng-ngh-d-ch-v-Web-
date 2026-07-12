<script setup>
import {ref, onMounted } from "vue";

import ListService from "@/services/list.service";

import { useUserStore } from "@/stores/user.store";
import { useTaskStore } from "@/stores/task.store";

const userStore = useUserStore();
const taskStore = useTaskStore();

const totalLists = ref(0);

const loadTaskLists = async () => {
  try {
    const response = await ListService.getAll();

    totalLists.value = response.data.length;
  } catch (error) {
    console.error("Cannot load task lists:", error);
  }
};

onMounted(async () => {
  await taskStore.loadTasks();

  await loadTaskLists();
});
</script>

<template>
  <div class="card shadow">

    <div class="card-body">

      <h2>Dashboard</h2>

      <hr>

      <h5>
        Welcome,
        <strong>{{ userStore.username }}</strong>
      </h5>

      <p class="mb-4">
        This is your personal task management dashboard.
      </p>

      <div
        v-if="taskStore.loading"
        class="text-center py-5"
      >
        Loading...
      </div>

      <div
        v-else
        class="row g-4"
      >

        <div class="col-md-6 col-lg-3">
          <div class="card border-primary shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-primary">
                Total Tasks
              </h6>

              <h2 class="fw-bold">
                {{ taskStore.totalTasks }}
              </h2>

            </div>

          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-warning shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-warning">
                Todo
              </h6>

              <h2 class="fw-bold">
                {{ taskStore.todoTasks }}
              </h2>

            </div>

          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-info shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-info">
                Doing
              </h6>

              <h2 class="fw-bold">
                {{ taskStore.doingTasks }}
              </h2>

            </div>

          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-success shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-success">
                Done
              </h6>

              <h2 class="fw-bold">
                {{ taskStore.doneTasks }}
              </h2>

            </div>

          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-danger shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-danger">
                High Priority
              </h6>

              <h2 class="fw-bold">
                {{ taskStore.highPriorityTasks }}
              </h2>

            </div>

          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-secondary shadow-sm">

            <div class="card-body text-center">

              <h6 class="text-secondary">
                Task Lists
              </h6>

              <h2 class="fw-bold">
                {{ totalLists }}
              </h2>

            </div>

          </div>
        </div>

      </div>

    </div>

  </div>
</template>