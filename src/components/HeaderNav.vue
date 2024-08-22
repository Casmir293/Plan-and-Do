<template>
  <section class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Tasks</h1>
    <div>
      <!-- <v-btn append-icon="mdi-plus" variant="tonal"> New Task </v-btn> -->
      <TaskModal :isAddTask="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TaskModal from "./TaskModal.vue";
</script>
