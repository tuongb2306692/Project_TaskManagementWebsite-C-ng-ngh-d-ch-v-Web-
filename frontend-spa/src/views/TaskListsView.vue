<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";
import { useListStore } from "@/stores/list.store";


const listStore = useListStore();


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
let createListModal = null;
let editListModal = null;

const loadTaskLists = async () => {
  await listStore.loadTaskLists();
};

const createTaskList = async () => {
  creating.value = true;

  try {
    await listStore.createTaskList(newList.value);


    createListModal.hide();

    document.body.classList.remove("modal-open");

    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.remove());

    newList.value = {
      tl_name: "",
      tl_description: "",
    };
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot create task list."
    );
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

  editListModal.show();
};

const updateTaskList = async () => {
  editing.value = true;

  try {
    await listStore.updateTaskList(
        editList.value.tl_id,
        {
        tl_name: editList.value.tl_name,
        tl_description: editList.value.tl_description,
      }
      );

    
    editListModal.hide();

    document.body.classList.remove("modal-open");

    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.remove());

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot update task list."
    );
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
    await listStore.deleteTaskList(id);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Cannot delete task list."
    );
  }
};


onMounted(async () => {
    await loadTaskLists();

    createListModal = new bootstrap.Modal(
        document.getElementById("createListModal")
    );

    editListModal = new bootstrap.Modal(
        document.getElementById("editListModal")
    );
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
        v-if="listStore.loading"
        class="text-center"
      >
        Loading...
      </div>

      <div
        v-else-if="listStore.errorMessage"
        class="alert alert-danger"
      >
        {{ listStore.errorMessage}}
      </div>

      <div
        v-else-if="listStore.taskLists.length === 0"
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
            v-for="list in listStore.taskLists"
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