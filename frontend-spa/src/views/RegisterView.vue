<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">

        <div class="card shadow">
          <div class="card-body">

            <h2 class="text-center mb-4">
              Create Account
            </h2>

            <form>

              <div class="mb-3">
                <label class="form-label">
                  Username
                </label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter username"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>

                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Password
                </label>

                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm password"
                />
              </div>

              <button
                type="submit"
                class="btn btn-success w-100 mb-3"
              >
                Register
              </button>

            </form>

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

<script setup>
import { RouterLink } from 'vue-router';
</script>