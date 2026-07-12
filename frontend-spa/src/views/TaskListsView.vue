<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";
import ListService from "@/services/list.service";

const taskLists = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const newList = ref({
  tl_name: "",
  tl_description: "",
});

const editList = ref({
  tl_id: null,
  tl_name: "",
  tl_description: "",
});

const creating = ref(false);
const editing = ref(false);

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

const createTaskList = async () => {
  creating.value = true;

  try {
    await ListService.create(newList.value);

    const modalElement = document.getElementById("createListModal");
    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }

    newList.value = {
      tl_name: "",
      tl_description: "",
    };

    await loadTaskLists();
  } catch (error) {
    alert(error.response?.data?.message || "Cannot create task list.");
  } finally {
    creating.value = false;
  }
};

const openEditModal = (list) => {
  editList.value = {
    tl_id: list.tl_id,
    tl_name: list.tl_name,
    tl_description: list.tl_description,
  };

  const modal = new bootstrap.Modal(
    document.getElementById("editListModal")
  );

  modal.show();
};

const updateTaskList = async () => {
  editing.value = true;

  try {
    await ListService.update(editList.value.tl_id, {
      tl_name: editList.value.tl_name,
      tl_description: editList.value.tl_description,
    });

    const modalElement = document.getElementById("editListModal");
    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }

    await loadTaskLists();
  } catch (error) {
    alert(error.response?.data?.message || "Cannot update task list.");
  } finally {
    editing.value = false;
  }
};

const deleteTaskList = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task list?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await ListService.delete(id);

    await loadTaskLists();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot delete task list."
    );
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

        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createListModal"
        >
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
        class="table table-hover align-middle"
      >
        <thead>
          <tr>
            <th width="80">ID</th>
            <th>Title</th>
            <th>Description</th>
            <th width="180" class="text-center">
              Actions
            </th>
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

            <td class="text-center">
              <button
                class="btn btn-warning btn-sm me-2"
                @click="openEditModal(list)"
              >
                <i class="fas fa-edit"></i>
                Edit
              </button>

             <button
                class="btn btn-danger btn-sm"
                @click="deleteTaskList(list.tl_id)"
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
    id="createListModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            Create Task List
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
              Title
            </label>

            <input
              v-model="newList.tl_name"
              type="text"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Description
            </label>

            <textarea
              v-model="newList.tl_description"
              class="form-control"
              rows="3"
            ></textarea>
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
            @click="createTaskList"
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
    id="editListModal"
    tabindex="-1"
    aria-hidden="true"
  >

    <div class="modal-dialog">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title">
            Edit Task List
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
              Title
            </label>

            <input
              v-model="editList.tl_name"
              type="text"
              class="form-control"
            />

          </div>

          <div class="mb-3">

            <label class="form-label">
              Description
            </label>

            <textarea
              v-model="editList.tl_description"
              class="form-control"
              rows="3"
            ></textarea>

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
            @click="updateTaskList"
            :disabled="editing"
          >
            <span v-if="editing">
              Updating...
            </span>

            <span v-else>
              Update
            </span>

          </button>

        </div>

      </div>

    </div>

  </div>

</template>