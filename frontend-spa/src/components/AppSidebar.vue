<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="list-group shadow">

    <RouterLink
      to="/dashboard"
      class="list-group-item list-group-item-action"
    >
      <i class="fas fa-home me-2"></i>
      Dashboard
    </RouterLink>

    <RouterLink
      to="/lists"
      class="list-group-item list-group-item-action"
    >
      <i class="fas fa-list me-2"></i>
      Task Lists
    </RouterLink>

    <RouterLink
      to="/tasks"
      class="list-group-item list-group-item-action"
    >
      <i class="fas fa-check-square me-2"></i>
      Tasks
    </RouterLink>

    <li class="list-group-item">
  <RouterLink
    to="/profile"
    class="text-decoration-none text-dark d-block"
  >
    <i class="fas fa-user me-3"></i>

    Profile
  </RouterLink>
</li>

  </div>
</template>