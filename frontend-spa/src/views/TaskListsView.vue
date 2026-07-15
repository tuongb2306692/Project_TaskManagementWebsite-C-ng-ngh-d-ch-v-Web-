<script setup>
import { ref } from 'vue';
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/vue-query';

import ListService from '@/services/list.service';

const queryClient = useQueryClient();

const form = ref({
    tl_name: '',
    tl_description: '',
});

const editingId = ref(null);
const errorMessage = ref('');

const listsQuery = useQuery({
    queryKey: ['task-lists'],
    queryFn: () => ListService.getAll(),
    refetchInterval: 5000,
});

const saveMutation = useMutation({
    mutationFn: () => {
        if (editingId.value) {
            return ListService.update(editingId.value, form.value);
        }

        return ListService.create(form.value);
    },
    onSuccess: () => {
        form.value = {
            tl_name: '',
            tl_description: '',
        };

        editingId.value = null;
        errorMessage.value = '';

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

function submitForm() {
    errorMessage.value = '';

    if (!form.value.tl_name.trim()) {
        errorMessage.value = 'Task list name is required.';
        return;
    }

    saveMutation.mutate();
}

function editList(list) {
    editingId.value = list.tl_id;

    form.value = {
        tl_name: list.tl_name,
        tl_description: list.tl_description || '',
    };
}

function cancelEdit() {
    editingId.value = null;

    form.value = {
        tl_name: '',
        tl_description: '',
    };
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
            <h2>Task Lists</h2>

            <hr />

            <div
                v-if="errorMessage"
                class="alert alert-danger"
            >
                {{ errorMessage }}
            </div>

            <form
                class="row g-2 mb-4"
                @submit.prevent="submitForm"
            >
                <div class="col-md-4">
                    <input
                        v-model="form.tl_name"
                        class="form-control"
                        placeholder="Task list name"
                    />
                </div>

                <div class="col-md-5">
                    <input
                        v-model="form.tl_description"
                        class="form-control"
                        placeholder="Description"
                    />
                </div>

                <div class="col-md-3">
                    <button class="btn btn-primary me-2">
                        {{ editingId ? 'Update' : 'Create' }}
                    </button>

                    <button
                        v-if="editingId"
                        type="button"
                        class="btn btn-secondary"
                        @click="cancelEdit"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <div v-if="listsQuery.isLoading.value">
                Loading...
            </div>

            <table
                v-else
                class="table table-hover align-middle"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="list in listsQuery.data.value || []"
                        :key="list.tl_id"
                    >
                        <td>{{ list.tl_id }}</td>
                        <td>{{ list.tl_name }}</td>
                        <td>{{ list.tl_description }}</td>

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
                </tbody>
            </table>
        </div>
    </div>
</template>