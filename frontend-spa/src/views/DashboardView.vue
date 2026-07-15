<script setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import ListService from '@/services/list.service';
import TaskService from '@/services/task.service';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();

const listsQuery = useQuery({
    queryKey: ['task-lists'],
    queryFn: () => ListService.getAll(),
    refetchInterval: 15000,
    refetchIntervalInBackground: false,
});

const tasksQuery = useQuery({
    queryKey: ['tasks-dashboard'],
    queryFn: () => TaskService.getAll(),
    refetchInterval: 15000,
    refetchIntervalInBackground: false,
});

const lists = computed(() => listsQuery.data.value || []);
const tasks = computed(() => tasksQuery.data.value || []);

const todoTasks = computed(() =>
    tasks.value.filter((task) => task.task_status === 'Todo').length
);

const doingTasks = computed(() =>
    tasks.value.filter((task) => task.task_status === 'Doing').length
);

const doneTasks = computed(() =>
    tasks.value.filter((task) => task.task_status === 'Done').length
);

const highPriorityTasks = computed(() =>
    tasks.value.filter((task) => task.task_priority === 'High').length
);
</script>

<template>
    <div class="card shadow">
        <div class="card-body">
            <h2>Dashboard</h2>

            <hr />

            <h5>
                Welcome,
                <strong>{{ userStore.username }}</strong>
            </h5>

            <div
                v-if="tasksQuery.isLoading.value || listsQuery.isLoading.value"
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
                            <h6 class="text-primary">Total Tasks</h6>
                            <h2>{{ tasks.length }}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-warning shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="text-warning">Todo</h6>
                            <h2>{{ todoTasks }}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-info shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="text-info">Doing</h6>
                            <h2>{{ doingTasks }}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-success shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="text-success">Done</h6>
                            <h2>{{ doneTasks }}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-danger shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="text-danger">High Priority</h6>
                            <h2>{{ highPriorityTasks }}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-secondary shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="text-secondary">Task Lists</h6>
                            <h2>{{ lists.length }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>