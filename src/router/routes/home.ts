import type { RouteRecordRaw } from "vue-router";

export const route: RouteRecordRaw = {
  name: "home",
  path: "/",
  component: () => import("@/pages/home.vue"),
};
