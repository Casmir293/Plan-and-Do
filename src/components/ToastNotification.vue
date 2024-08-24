<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { toasts, addToast, removeToast } = useToast();

const showToast = () => {
  addToast({
    message: "This is a toast message!",
    type: "success",
    timeout: 5000,
  });
};
</script>

<template>
  <div>
    <button @click="showToast">Show Toast</button>

    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="toast.type"
    >
      {{ toast.message }}
      <button v-if="toast.id" @click="removeToast(toast.id)">x</button>
    </div>
  </div>
</template>

<style>
.toast {
}

.toast.success {
}
</style>
