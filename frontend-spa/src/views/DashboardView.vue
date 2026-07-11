<script setup>
import LogoutButton from "@/components/LogoutButton.vue";

const user = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <div class="container mt-5">

    <div class="card shadow">

      <div class="card-body text-center">

        <h2>Dashboard</h2>

        <p class="mt-3">
          Welcome,
          <strong>{{ user.user_username }}</strong>
        </p>

        <LogoutButton />

      </div>

    </div>

  </div>
</template>