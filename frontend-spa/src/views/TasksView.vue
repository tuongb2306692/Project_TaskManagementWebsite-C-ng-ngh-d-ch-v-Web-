<script setup>
import { computed, ref } from 'vue';
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/vue-query';

import ListService from '@/services/list.service';
import TaskService from '@/services/task.service';

const queryClient = useQueryClient();

const filters = ref({
    status: '',
    priority: '',
    tl_id: '',
    overdue: '',
});

const form = ref({
    tl_id: '',
    task_title: '',
    task_description: '',
    task_priority: 'Medium',
    task_status: 'Todo',
    task_due_date: '',
});

const editingId = ref(null);
const errorMessage = ref('');

const taskQueryParams = computed(() => ({
    status: filters.value.status || undefined,
    priority: filters.value.priority || undefined,
    tl_id: filters.value.tl_id || undefined,
    overdue: filters.value.overdue || undefined,
}));

const listsQuery = useQuery({
    queryKey: ['task-lists'],
    queryFn: () => ListService.getAll(),
});

const tasksQuery = useQuery({
    queryKey: ['tasks', taskQueryParams],
    queryFn: () => TaskService.getAll(taskQueryParams.value),
    refetchInterval: 5000,
});

const saveMutation = useMutation({
    mutationFn: () => {
        if (editingId.value) {
            return TaskService.update(editingId.value, form.value);
        }

        return TaskService.create(form.value);
    },
    onSuccess: () => {
        resetForm();

        queryClient.invalidateQueries({
            queryKey: ['tasks'],
        });
    },
    onError: (error) => {
        errorMessage.value =
            error.response?.data?.message || 'Cannot save task.';
    },
});

const deleteMutation = useMutation({
    mutationFn: (id) => TaskService.delete(id),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['tasks'],
        });
    },
});

function resetForm() {
    editingId.value = null;
    errorMessage.value = '';

    form.value = {
        tl_id: '',
        task_title: '',
        task_description: '',
        task_priority: 'Medium',
        task_status: 'Todo',
        task_due_date: '',
    };
}

function submitForm() {
    errorMessage.value = '';

    if (!form.value.tl_id) {
        errorMessage.value = 'Please select a task list.';
        return;
    }

    if (!form.value.task_title.trim()) {
        errorMessage.value = 'Task title is required.';
        return;
    }

    saveMutation.mutate();
}

function editTask(task) {
    editingId.value = task.task_id;

    form.value = {
        tl_id: task.tl_id,
        task_title: task.task_title,
        task_description: task.task_description || '',
        task_priority: task.task_priority,
        task_status: task.task_status,
        task_due_date: task.task_due_date
            ? task.task_due_date.substring(0, 10)
            : '',
    };
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        deleteMutation.mutate(id);
    }
}

function listName(id) {
    const list = (listsQuery.data.value || []).find(
        (item) => item.tl_id === id
    );

    return list?.tl_name || '';
}
</script>

<template>
    <div class="card shadow">
        <div class="card-body">
            <h2>Tasks</h2>

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
                <div class="col-md-3">
                    <select
                        v-model="form.tl_id"
                        class="form-select"
                    >
                        <option value="">Select list</option>

                        <option
                            v-for="list in listsQuery.data.value || []"
                            :key="list.tl_id"
                            :value="list.tl_id"
                        >
                            {{ list.tl_name }}
                        </option>
                    </select>
                </div>

                <div class="col-md-3">
                    <input
                        v-model="form.task_title"
                        class="form-control"
                        placeholder="Task title"
                    />
                </div>

                <div class="col-md-2">
                    <select
                        v-model="form.task_priority"
                        class="form-select"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <div class="col-md-2">
                    <select
                        v-model="form.task_status"
                        class="form-select"
                    >
                        <option>Todo</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>

                <div class="col-md-2">
                    <input
                        v-model="form.task_due_date"
                        type="date"
                        class="form-control"
                    />
                </div>

                <div class="col-12">
                    <textarea
                        v-model="form.task_description"
                        class="form-control"
                        rows="2"
                        placeholder="Description"
                    ></textarea>
                </div>

                <div class="col-12">
                    <button class="btn btn-primary me-2">
                        {{ editingId ? 'Update Task' : 'Create Task' }}
                    </button>

                    <button
                        v-if="editingId"
                        type="button"
                        class="btn btn-secondary"
                        @click="resetForm"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <div class="row g-2 mb-3">
                <div class="col-md-3">
                    <select
                        v-model="filters.status"
                        class="form-select"
                    >
                        <option value="">All status</option>
                        <option>Todo</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <select
                        v-model="filters.priority"
                        class="form-select"
                    >
                        <option value="">All priority</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <select
                        v-model="filters.tl_id"
                        class="form-select"
                    >
                        <option value="">All lists</option>

                        <option
                            v-for="list in listsQuery.data.value || []"
                            :key="list.tl_id"
                            :value="list.tl_id"
                        >
                            {{ list.tl_name }}
                        </option>
                    </select>
                </div>

                <div class="col-md-3">
                    <select
                        v-model="filters.overdue"
                        class="form-select"
                    >
                        <option value="">All due dates</option>
                        <option value="true">Overdue</option>
                        <option value="false">Not overdue filter</option>
                    </select>
                </div>
            </div>

            <div v-if="tasksQuery.isLoading.value">
                Loading...
            </div>

            <table
                v-else
                class="table table-hover align-middle"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>List</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due date</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="task in tasksQuery.data.value || []"
                        :key="task.task_id"
                    >
                        <td>{{ task.task_id }}</td>
                        <td>{{ task.task_title }}</td>
                        <td>{{ listName(task.tl_id) }}</td>
                        <td>{{ task.task_status }}</td>
                        <td>{{ task.task_priority }}</td>
                        <td>{{ task.task_due_date }}</td>

                        <td class="text-end">
                            <button
                                class="btn btn-warning btn-sm me-2"
                                @click="editTask(task)"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                @click="deleteTask(task.task_id)"
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