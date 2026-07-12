<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
} from "vue";

import * as bootstrap from "bootstrap";

import ListService from "@/services/list.service";
import { useTaskStore } from "@/stores/task.store";

const taskStore = useTaskStore();

let polling = null;

const taskLists = ref([]);

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

const creating = ref(false);
const editing = ref(false);

let createTaskModal = null;
let editTaskModal = null;

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-GB");
};

const getTaskListName = (tl_id) => {
  const list = taskLists.value.find(
    (item) => item.tl_id === tl_id
  );

  return list ? list.tl_name : "";
};

const loadTaskLists = async () => {
  try {
    const response = await ListService.getAll();

    taskLists.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const createTask = async () => {
  if (!newTask.value.tl_id) {
    alert("Please select a task list.");
    return;
  }

  if (!newTask.value.task_title.trim()) {
    alert("Please enter task title.");
    return;
  }

  creating.value = true;

  try {
    await taskStore.createTask(newTask.value);

    createTaskModal.hide();

    document.body.classList.remove("modal-open");

    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.remove());

    newTask.value = {
      tl_id: "",
      task_title: "",
      task_description: "",
      task_priority: "Medium",
      task_status: "Todo",
      task_due_date: "",
    };
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

  editTaskModal.show();
};

const updateTask = async () => {
  if (!editTask.value.task_title.trim()) {
    alert("Please enter task title.");
    return;
  }

  editing.value = true;

  try {
    await taskStore.updateTask(
      editTask.value.task_id,
      {
        tl_id: editTask.value.tl_id,
        task_title: editTask.value.task_title,
        task_description:
          editTask.value.task_description,
        task_priority:
          editTask.value.task_priority,
        task_status:
          editTask.value.task_status,
        task_due_date:
          editTask.value.task_due_date,
      }
    );

    editTaskModal.hide();

    document.body.classList.remove("modal-open");

    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.remove());
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
    await taskStore.deleteTask(id);
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot delete task."
    );
  }
};

onMounted(async () => {
  await taskStore.loadTasks();

  await loadTaskLists();

  createTaskModal = new bootstrap.Modal(
    document.getElementById("createTaskModal")
  );

  editTaskModal = new bootstrap.Modal(
    document.getElementById("editTaskModal")
  );

  polling = setInterval(async () => {
    if (!document.hidden) {
      await taskStore.loadTasks();
    }
  }, 5000);
});

onUnmounted(() => {
  if (polling) {
    clearInterval(polling);
  }
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

      <hr>

      <div
        v-if="taskStore.loading"
        class="text-center"
      >
        Loading...
      </div>

      <div
        v-else-if="taskStore.errorMessage"
        class="alert alert-danger"
      >
        {{ taskStore.errorMessage }}
      </div>

      <div
        v-else-if="taskStore.tasks.length === 0"
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

            <th width="70">
              ID
            </th>

            <th>
              Title
            </th>

            <th>
              Status
            </th>

            <th>
              Priority
            </th>

            <th>
              Due Date
            </th>

            <th>
              Task List
            </th>

            <th
              width="180"
              class="text-center"
            >
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="task in taskStore.tasks"
            :key="task.task_id"
          >

            <td>
              {{ task.task_id }}
            </td>

            <td>
              {{ task.task_title }}
            </td>

            <td>
              {{ task.task_status }}
            </td>

            <td>
              {{ task.task_priority }}
            </td>

            <td>
              {{ formatDate(task.task_due_date) }}
            </td>

            <td>
              {{ getTaskListName(task.tl_id) }}
            </td>

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

            <label class="form-label">
              Task List
            </label>

            <select
              class="form-select"
              v-model="newTask.tl_id"
            >

              <option value="">
                Select Task List
              </option>

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

            <label class="form-label">
              Title
            </label>

            <input
              type="text"
              class="form-control"
              v-model="newTask.task_title"
            />

          </div>

          <div class="mb-3">

            <label class="form-label">
              Description
            </label>

            <textarea
              rows="3"
              class="form-control"
              v-model="newTask.task_description"
            ></textarea>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Priority
            </label>

            <select
              class="form-select"
              v-model="newTask.task_priority"
            >

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Status
            </label>

            <select
              class="form-select"
              v-model="newTask.task_status"
            >

              <option value="Todo">
                Todo
              </option>

              <option value="Doing">
                Doing
              </option>

              <option value="Done">
                Done
              </option>

            </select>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Due Date
            </label>

            <input
              type="date"
              class="form-control"
              v-model="newTask.task_due_date"
            />

          </div>

        </div>

        <div class="modal-footer">

          <button
            type="button"
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
    <!-- Edit Modal -->

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

            <label class="form-label">
              Task List
            </label>

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

            <label class="form-label">
              Title
            </label>

            <input
              type="text"
              class="form-control"
              v-model="editTask.task_title"
            />

          </div>

          <div class="mb-3">

            <label class="form-label">
              Description
            </label>

            <textarea
              rows="3"
              class="form-control"
              v-model="editTask.task_description"
            ></textarea>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Priority
            </label>

            <select
              class="form-select"
              v-model="editTask.task_priority"
            >

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Status
            </label>

            <select
              class="form-select"
              v-model="editTask.task_status"
            >

              <option value="Todo">
                Todo
              </option>

              <option value="Doing">
                Doing
              </option>

              <option value="Done">
                Done
              </option>

            </select>

          </div>

          <div class="mb-3">

            <label class="form-label">
              Due Date
            </label>

            <input
              type="date"
              class="form-control"
              v-model="editTask.task_due_date"
            />

          </div>

        </div>

        <div class="modal-footer">

          <button
            type="button"
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