import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "signup",
          name: "SignUp",
          component: () => import("@/views/auth/SignUp.vue"),
        },
        {
          path: "signin",
          name: "SignIn",
          component: () => import("@/views/auth/SignIn.vue"),
        },
        {
          path: "signout",
          name: "SignOut",
          component: () => import("@/views/auth/SignOut.vue"),
        },
        {
          path: "",
          redirect: { name: "NotFound" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
