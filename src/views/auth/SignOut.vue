<script lang="ts" setup>
import { onMounted } from "vue";
import useAuth from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { logOut } = useAuth();
const router = useRouter();

onMounted(async () => {
  await logOut();
  router.push({ name: "SignIn" });
});
</script>

<template>
  <div></div>
</template>
