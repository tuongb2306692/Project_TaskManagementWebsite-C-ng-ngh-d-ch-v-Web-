<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
</script>

<template>
  <div>

    <AppNavbar />

    <div class="container-fluid">

      <div class="row">

        <div class="col-md-3 col-lg-2 bg-light min-vh-100 p-3">

          <AppSidebar />

        </div>

        <div class="col-md-9 col-lg-10 p-4">

          <router-view />

        </div>

      </div>

    </div>

  </div>
</template>