import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";

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
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
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