<script setup lang="ts">
import TaskCard from "./TaskCard.vue";

const status = [
  { name: "To do", background: "#CAD9F6", icon: "mdi-text-box-edit-outline" },
  { name: "In progress", background: "#FFE4C2", icon: "mdi-timer-sand" },
  { name: "Done", background: "#FAD0C6", icon: "mdi-check" },
];
</script>

<template>
  <section class="grid gap-8 p-4">
    <template v-for="(column, index) in status" :key="index">
      <div
        :style="{ backgroundColor: column.background }"
        class="min-h-60 rounded-md p-4"
      >
        <div class="mb-3">
          <v-icon :icon="column.icon" />
          <span class="font-semibold">{{ column.name }}</span>
        </div>
        <div class="">
          <TaskCard />
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
section {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
