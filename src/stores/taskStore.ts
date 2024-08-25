import { ref } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore(
  "task",
  () => {
    const tasks = ref<Task[]>();

    return { tasks };
  },
  {
    persist: true,
  },
);
