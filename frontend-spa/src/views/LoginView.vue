<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">

        <div class="card shadow">
          <div class="card-body">

            <h2 class="text-center mb-4">
              Personal Task Management
            </h2>

            <form>

              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>

                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Password
                </label>

                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
</script>