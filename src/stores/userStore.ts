import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<any | null>(null);
    const authState = ref<any | null>(null);
    const userId = ref<UserId>(null);
    const myProfile = ref<MyProfile | null>(null);

    const isLoggedIn = computed(() => {
      return user.value !== null;
    });

    return { user, authState, myProfile, isLoggedIn, userId };
  },
  {
    persist: true,
  },
);
