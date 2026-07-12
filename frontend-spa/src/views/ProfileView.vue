<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();
const avatar = ref("");
const avatarInput = ref(null);


onMounted(() => {
  const savedAvatar = localStorage.getItem("avatar");

  if (savedAvatar) {
    avatar.value = savedAvatar;
  }
});

const uploadAvatar = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    avatar.value = reader.result;

    localStorage.setItem(
      "avatar",
      reader.result
    );
  };

  reader.readAsDataURL(file);
};

const openFilePicker = () => {
  avatarInput.value.click();
};

</script>

<template>
  <div class="card shadow">

    <div class="card-body">

      <h2>Profile</h2>

      <hr>

      <div class="text-center mb-4">

        <div class="mb-4">

  <div class="position-relative d-inline-block">

    <img
      v-if="avatar"
      :src="avatar"
      class="rounded-circle shadow border"
      width="180"
      height="180"
      style="object-fit: cover;"
    />

    <i
      v-else
      class="fas fa-user-circle text-primary"
      style="font-size: 180px;"
    ></i>

    <button
      class="btn btn-light shadow-sm position-absolute"
      style="
        bottom: 10px;
        left: 10px;
        border-radius: 12px;
      "
      @click="openFilePicker"
    >
      <i class="fas fa-pen me-2"></i>

      Edit
    </button>

    <input
      ref="avatarInput"
      type="file"
      accept="image/*"
      class="d-none"
      @change="uploadAvatar"
    />

  </div>

</div>

        <h3 class="mt-3">
          {{ userStore.username }}
        </h3>

        <p class="text-muted">
          Personal Task Management User
        </p>

      </div>

      <table class="table">

  <thead>

    <tr>

      <th width="250">
        Field
      </th>

      <th>
        Value
      </th>

    </tr>

  </thead>

  <tbody>

    <tr>

      <td>
        Username
      </td>

      <td>
        {{ userStore.username }}
      </td>

    </tr>

    <tr>

      <td>
        User ID
      </td>

      <td>
        {{ userStore.user?.user_id }}
      </td>

    </tr>

    <tr>

      <td>
        Login Status
      </td>

      <td>
        Active
      </td>

    </tr>

  </tbody>

</table>

    </div>

  </div>
</template>