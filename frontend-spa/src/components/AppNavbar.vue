<script setup>
const user = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <nav class="navbar navbar-dark bg-primary shadow">
    <div class="container-fluid">

      <span class="navbar-brand mb-0 h1">
        Personal Task Management
      </span>

      <span class="text-white">
        <i class="fas fa-user me-2"></i>

        {{ user.user_username }}
      </span>

    </div>
  </nav>
</template>