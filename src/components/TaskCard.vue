<script setup lang="ts">
import TaskModal from "./TaskModal.vue";
import DeleteModal from "./DeleteModal.vue";

defineProps<{
  task: TaskDataForm;
}>();
</script>

<template>
  <section class="mb-6 border-2 bg-slate-50 p-2">
    <div class="mb-3 flex items-center justify-between">
      <div class="text-xl font-semibold">{{ task.title }}</div>
      <div class="flex items-center">
        <TaskModal :isEditTask="true" :task="task" />
        <DeleteModal />
      </div>
    </div>
    <p>
      {{ task.description }}
    </p>
    <div class="mt-3 flex items-center gap-2">
      <div
        class="h-3 w-3 rounded-full"
        :class="`priority-${task.priority}`"
      ></div>
      <p class="font-light">{{ task.priority }}</p>
    </div>
  </section>
</template>

<style scoped>
.priority-low {
  background: orange;
}

.priority-medium {
  background: green;
}

.priority-high {
  background: red;
}
</style>
