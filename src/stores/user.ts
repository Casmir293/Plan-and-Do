import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<any | null>(null);

  const isLoggedIn = computed(() => {
    return user.value !== null;
  });

  return { user, isLoggedIn };
});
