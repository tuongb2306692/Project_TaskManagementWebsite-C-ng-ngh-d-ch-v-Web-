<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";

const router = useRouter();
const userStore = useUserStore();

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = (event) => {
  if (!event.target.closest(".dropdown")) {
    showMenu.value = false;
  }
};

const logout = () => {
  showMenu.value = false;
  userStore.logout();
  router.push("/login");
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<template>
  <nav class="navbar navbar-dark bg-primary shadow">

    <div class="container-fluid">

      <span class="navbar-brand">
        Personal Task Management
      </span>

      <div class="dropdown">

        <button
          class="btn btn-primary dropdown-toggle"
          @click.stop="toggleMenu"
        >
          <i class="fas fa-user me-2"></i>
          {{ userStore.username }}
        </button>

        <ul
          class="dropdown-menu dropdown-menu-end"
          :class="{ show: showMenu }"
        >
          <li>
            <button
              class="dropdown-item text-danger"
              @click="logout"
            >
              <i class="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          </li>
        </ul>

      </div>

    </div>

  </nav>
</template>