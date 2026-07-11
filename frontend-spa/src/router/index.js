import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import AppLayout from "@/layouts/AppLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      guest: true,
    },
  },

  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      guest: true,
    },
  },

  {
    path: "/",
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardView,
      },
      
      {
        path: "lists",
        name: "lists",
        component: () => import("@/views/TaskListsView.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.meta.guest && token) {
    return next("/dashboard");
  }

  next();
});

export default router;