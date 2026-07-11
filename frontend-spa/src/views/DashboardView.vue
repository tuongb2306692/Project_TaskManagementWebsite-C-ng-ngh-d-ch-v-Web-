<script setup>
const user = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <div class="card shadow">

    <div class="card-body">

      <h2>Dashboard</h2>

      <hr>

      <h5>
        Welcome,
        <strong>{{ user.user_username }}</strong>
      </h5>

      <p class="mt-3">
        This is your personal task management dashboard.
      </p>

    </div>

  </div>
</template>