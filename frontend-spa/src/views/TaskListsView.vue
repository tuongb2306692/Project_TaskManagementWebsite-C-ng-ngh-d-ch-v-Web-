<script setup>
import { ref, onMounted } from "vue";
import ListService from "@/services/list.service";

const taskLists = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const loadTaskLists = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await ListService.getAll();

    taskLists.value = response.data;
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Cannot load task lists.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadTaskLists();
});
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Task Lists</h2>

        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          New List
        </button>
      </div>

      <hr />

      <div
        v-if="loading"
        class="text-center"
      >
        Loading...
      </div>

      <div
        v-else-if="errorMessage"
        class="alert alert-danger"
      >
        {{ errorMessage }}
      </div>

      <div
        v-else-if="taskLists.length === 0"
        class="text-muted"
      >
        No task lists found.
      </div>

      <table
        v-else
        class="table table-hover"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="list in taskLists"
            :key="list.tl_id"
          >
            <td>{{ list.tl_id }}</td>
            <td>{{ list.tl_name }}</td>
            <td>{{ list.tl_description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>