<script setup>
import { RouterLink, useRouter } from "vue-router";
import AuthService from "@/services/auth.service";
import { ref, onMounted } from "vue";

const router = useRouter();
onMounted(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    router.push("/dashboard");
  }
});

const username = ref("");
const password = ref("");

const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";

  if (!username.value.trim()) {
    errorMessage.value = "Username is required.";
    return;
  }

  if (!password.value.trim()) {
    errorMessage.value = "Password is required.";
    return;
  }

  loading.value = true;

  try {
    const response = await AuthService.login({
      username: username.value,
      password: password.value,
    });

    localStorage.setItem(
      "accessToken",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert(response.message);

    router.push("/dashboard");
  } catch (error) {
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Login failed.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">

        <div class="card shadow">
          <div class="card-body">

            <h2 class="text-center mb-4">
              Personal Task Management
            </h2>

            <form @submit.prevent="handleLogin">

              <div
                v-if="errorMessage"
                class="alert alert-danger"
              >
                {{ errorMessage }}
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Username
                </label>

                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  placeholder="Enter username"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Password
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                >
              </div>

              <button
                class="btn btn-primary w-100"
                type="submit"
                :disabled="loading"
              >
                {{ loading ? "Logging in..." : "Login" }}
              </button>

            </form>

            <hr>

            <p class="text-center mb-0">
              Don't have an account?

              <RouterLink to="/register">
                Register
              </RouterLink>

            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>