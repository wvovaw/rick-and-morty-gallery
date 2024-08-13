/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_URL,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom",
      coverage: {
        provider: "v8",
        exclude: ["node_modules/", "dist/"],
        all: true,
      },
    },
  };
});
