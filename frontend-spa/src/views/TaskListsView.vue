<script setup>
import { computed, ref } from 'vue';
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/vue-query';

import ListService from '@/services/list.service';

const queryClient = useQueryClient();

const showForm = ref(false);
const editingId = ref(null);
const errorMessage = ref('');

const form = ref({
    tl_name: '',
    tl_description: '',
});

const listsQuery = useQuery({
    queryKey: ['task-lists'],
    queryFn: () => ListService.getAll(),
});

const taskLists = computed(() => listsQuery.data.value || []);

const saveMutation = useMutation({
    mutationFn: () => {
        if (editingId.value) {
            return ListService.update(editingId.value, form.value);
        }

        return ListService.create(form.value);
    },
    onSuccess: () => {
        resetForm();

        queryClient.invalidateQueries({
            queryKey: ['task-lists'],
        });
    },
    onError: (error) => {
        errorMessage.value =
            error.response?.data?.message || 'Cannot save task list.';
    },
});

const deleteMutation = useMutation({
    mutationFn: (id) => ListService.delete(id),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['task-lists'],
        });
    },
});

function openCreateForm() {
    resetForm();
    showForm.value = true;
}

function editList(list) {
    editingId.value = list.tl_id;
    showForm.value = true;

    form.value = {
        tl_name: list.tl_name,
        tl_description: list.tl_description || '',
    };
}

function resetForm() {
    editingId.value = null;
    showForm.value = false;
    errorMessage.value = '';

    form.value = {
        tl_name: '',
        tl_description: '',
    };
}

function submitForm() {
    errorMessage.value = '';

    if (!form.value.tl_name.trim()) {
        errorMessage.value = 'Task list name is required.';
        return;
    }

    saveMutation.mutate();
}

function deleteList(id) {
    if (confirm('Delete this task list?')) {
        deleteMutation.mutate(id);
    }
}
</script>

<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="mb-0">Task Lists</h2>

                <button
                    class="btn btn-primary"
                    @click="openCreateForm"
                >
                    <i class="fas fa-plus me-1"></i>
                    Add Task List
                </button>
            </div>

            <hr />

            <div
                v-if="errorMessage"
                class="alert alert-danger"
            >
                {{ errorMessage }}
            </div>

            <form
                v-if="showForm"
                class="border rounded p-3 mb-4 bg-light"
                @submit.prevent="submitForm"
            >
                <h5>
                    {{ editingId ? 'Edit Task List' : 'Create Task List' }}
                </h5>

                <div class="row g-3">
                    <div class="col-md-5">
                        <label class="form-label">Name</label>
                        <input
                            v-model="form.tl_name"
                            class="form-control"
                            placeholder="Task list name"
                        />
                    </div>

                    <div class="col-md-7">
                        <label class="form-label">Description</label>
                        <input
                            v-model="form.tl_description"
                            class="form-control"
                            placeholder="Description"
                        />
                    </div>
                </div>

                <div class="mt-3">
                    <button class="btn btn-primary me-2">
                        {{ editingId ? 'Update' : 'Create' }}
                    </button>

                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="resetForm"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <div
                v-if="listsQuery.isLoading.value"
                class="text-center py-4"
            >
                Loading...
            </div>

            <table
                v-else
                class="table table-hover align-middle"
            >
                <thead>
                    <tr>
                        <th style="width: 80px;">ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="list in taskLists"
                        :key="list.tl_id"
                    >
                        <td>{{ list.tl_id }}</td>
                        <td>{{ list.tl_name }}</td>
                        <td>{{ list.tl_description || '-' }}</td>

                        <td class="text-end">
                            <button
                                class="btn btn-warning btn-sm me-2"
                                @click="editList(list)"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                @click="deleteList(list.tl_id)"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>

                    <tr v-if="taskLists.length === 0">
                        <td
                            colspan="4"
                            class="text-center text-muted py-4"
                        >
                            No task lists yet.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>