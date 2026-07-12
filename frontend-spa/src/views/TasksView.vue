<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";

import TaskService from "@/services/task.service";
import ListService from "@/services/list.service";

const tasks = ref([]);
const taskLists = ref([]);

const loading = ref(true);
const errorMessage = ref("");

const creating = ref(false);
const editing = ref(false);

const newTask = ref({
  tl_id: "",
  task_title: "",
  task_description: "",
  task_priority: "Medium",
  task_status: "Todo",
  task_due_date: "",
});

const editTask = ref({
  task_id: null,
  tl_id: "",
  task_title: "",
  task_description: "",
  task_priority: "",
  task_status: "",
  task_due_date: "",
});

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB");
};

const loadTasks = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await TaskService.getAll();

    tasks.value = response.data;
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Cannot load tasks.";
  } finally {
    loading.value = false;
  }
};

const loadTaskLists = async () => {
  try {
    const response = await ListService.getAll();

    taskLists.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const createTask = async () => {
  creating.value = true;

  try {
    await TaskService.create(newTask.value);

    const modalElement =
      document.getElementById("createTaskModal");

    const modal =
      bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }

    newTask.value = {
      tl_id: "",
      task_title: "",
      task_description: "",
      task_priority: "Medium",
      task_status: "Todo",
      task_due_date: "",
    };

    await loadTasks();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot create task."
    );
  } finally {
    creating.value = false;
  }
};

const openEditModal = (task) => {
  editTask.value = {
    task_id: task.task_id,
    tl_id: task.tl_id,
    task_title: task.task_title,
    task_description: task.task_description,
    task_priority: task.task_priority,
    task_status: task.task_status,
    task_due_date: task.task_due_date
      ? task.task_due_date.substring(0, 10)
      : "",
  };

  const modal = new bootstrap.Modal(
    document.getElementById("editTaskModal")
  );

  modal.show();
};
const updateTask = async () => {
  editing.value = true;

  try {
    await TaskService.update(editTask.value.task_id, {
      tl_id: editTask.value.tl_id,
      task_title: editTask.value.task_title,
      task_description: editTask.value.task_description,
      task_priority: editTask.value.task_priority,
      task_status: editTask.value.task_status,
      task_due_date: editTask.value.task_due_date,
    });

    const modalElement =
      document.getElementById("editTaskModal");

    const modal =
      bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }

    await loadTasks();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot update task."
    );
  } finally {
    editing.value = false;
  }
};

const deleteTask = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await TaskService.delete(id);

    await loadTasks();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot delete task."
    );
  }
};

onMounted(async () => {
  await loadTaskLists();
  await loadTasks();
});
</script>
<template>
  <div class="card shadow">

    <div class="card-body">

      <div class="d-flex justify-content-between align-items-center mb-3">

        <h2>Tasks</h2>

        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createTaskModal"
        >
          <i class="fas fa-plus me-2"></i>
          New Task
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
        v-else-if="tasks.length === 0"
        class="text-muted"
      >
        No tasks found.
      </div>

      <table
        v-else
        class="table table-hover align-middle"
      >

        <thead>

          <tr>

            <th width="70">ID</th>

            <th>Title</th>

            <th>Status</th>

            <th>Priority</th>

            <th>Due Date</th>

            <th width="90">List ID</th>

            <th width="180" class="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="task in tasks"
            :key="task.task_id"
          >

            <td>{{ task.task_id }}</td>

            <td>{{ task.task_title }}</td>

            <td>{{ task.task_status }}</td>

            <td>{{ task.task_priority }}</td>

            <td>{{ formatDate(task.task_due_date) }}</td>

            <td>{{ task.tl_id }}</td>

            <td class="text-center">

              <button
                class="btn btn-warning btn-sm me-2"
                @click="openEditModal(task)"
              >
                <i class="fas fa-edit"></i>
                Edit
              </button>

              <button
                class="btn btn-danger btn-sm"
                @click="deleteTask(task.task_id)"
              >
                <i class="fas fa-trash"></i>
                Delete
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

  <!-- Create Modal -->
   <div
  class="modal fade"
  id="createTaskModal"
  tabindex="-1"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">

        <h5 class="modal-title">
          Create Task
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div class="modal-body">

        <div class="mb-3">
          <label class="form-label">Task List</label>

          <select
            class="form-select"
            v-model="newTask.tl_id"
          >
            <option value="">Select Task List</option>

            <option
              v-for="list in taskLists"
              :key="list.tl_id"
              :value="list.tl_id"
            >
              {{ list.tl_name }}
            </option>

          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Title</label>

          <input
            class="form-control"
            v-model="newTask.task_title"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>

          <textarea
            rows="3"
            class="form-control"
            v-model="newTask.task_description"
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Priority</label>

          <select
            class="form-select"
            v-model="newTask.task_priority"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Status</label>

          <select
            class="form-select"
            v-model="newTask.task_status"
          >
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Due Date</label>

          <input
            type="date"
            class="form-control"
            v-model="newTask.task_due_date"
          />
        </div>

      </div>

      <div class="modal-footer">

        <button
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>

        <button
          class="btn btn-primary"
          @click="createTask"
          :disabled="creating"
        >
          {{ creating ? "Creating..." : "Create" }}
        </button>

      </div>

    </div>
  </div>
</div>
<div
  class="modal fade"
  id="editTaskModal"
  tabindex="-1"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">

        <h5 class="modal-title">
          Edit Task
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div class="modal-body">

        <div class="mb-3">
          <label class="form-label">Task List</label>

          <select
            class="form-select"
            v-model="editTask.tl_id"
          >
            <option
              v-for="list in taskLists"
              :key="list.tl_id"
              :value="list.tl_id"
            >
              {{ list.tl_name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Title</label>

          <input
            class="form-control"
            v-model="editTask.task_title"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>

          <textarea
            rows="3"
            class="form-control"
            v-model="editTask.task_description"
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Priority</label>

          <select
            class="form-select"
            v-model="editTask.task_priority"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Status</label>

          <select
            class="form-select"
            v-model="editTask.task_status"
          >
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Due Date</label>

          <input
            type="date"
            class="form-control"
            v-model="editTask.task_due_date"
          />
        </div>

      </div>

      <div class="modal-footer">

        <button
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>

        <button
          class="btn btn-warning"
          @click="updateTask"
          :disabled="editing"
        >
          {{ editing ? "Updating..." : "Update" }}
        </button>

      </div>

    </div>
  </div>
</div>

</template>