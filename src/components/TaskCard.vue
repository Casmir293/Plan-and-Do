<script setup lang="ts">
import { ref } from "vue";
import TaskModal from "./TaskModal.vue";
import DeleteModal from "./DeleteModal.vue";

const tasks = ref([
  {
    title: "Do a lot today",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit itaque aut enim quaerat nostrum sed ab provident incidunt commodi distinctio perferendis, numquam modi, illum, architecto ad voluptate eos",
    priority: "high",
    status: "todo",
    due_date: "",
  },
  {
    title: "My second task",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit itaque aut enim quaerat nostrum sed ab provident incidunt commodi distinctio perferendis, numquam modi, illum, architecto ad voluptate eos",
    priority: "medium",
    status: "progress",
    due_date: "",
  },
  {
    title: "It's a wrap",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit itaque aut enim quaerat nostrum sed ab provident incidunt commodi distinctio perferendis, numquam modi, illum, architecto ad voluptate eos",
    priority: "low",
    status: "done",
    due_date: "",
  },
]);
</script>

<template>
  <template v-for="(task, index) in tasks" :key="index">
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
