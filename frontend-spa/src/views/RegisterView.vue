<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AuthService from '@/services/auth.service';

const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const loading = ref(false);
const errorMessage = ref('');

const handleRegister = async () => {
  errorMessage.value = '';

  if (!username.value.trim()) {
    errorMessage.value = 'Username is required.';
    return;
  }

  if (!password.value.trim()) {
    errorMessage.value = 'Password is required.';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Confirm password does not match.';
    return;
  }

  loading.value = true;

  try {
    const response = await AuthService.register({
      username: username.value,
      password: password.value,
    });

    alert(response.message);

    router.push('/login');
  } catch (error) {
    if (error.response?.data?.errors) {
      errorMessage.value = error.response.data.errors
        .map((item) => item.message)
        .join('\n');
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Register failed.';
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
              Create Account
            </h2>

            <form @submit.prevent="handleRegister">

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

              <div class="mb-3">
                <label class="form-label">
                  Confirm Password
                </label>

                <input
                  v-model="confirmPassword"
                  type="password"
                  class="form-control"
                  placeholder="Confirm password"
                >
              </div>

              <button
                class="btn btn-success w-100"
                type="submit"
                :disabled="loading"
              >
                {{ loading ? 'Registering...' : 'Register' }}
              </button>

            </form>

            <hr>

            <p class="text-center mb-0">
              Already have an account?

              <RouterLink to="/login">
                Login
              </RouterLink>

            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>