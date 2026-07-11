<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  router.push("/login");
};
</script>

<template>
  <button
    class="btn btn-danger"
    @click="logout"
  >
    Logout
  </button>
</template>