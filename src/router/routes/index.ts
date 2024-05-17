import type { RouteRecordRaw } from "vue-router";
import { route as homeRoute } from "./home";

export const routes: readonly RouteRecordRaw[] = [
  homeRoute,
] as const;
