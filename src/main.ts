import "@unocss/reset/tailwind.css";
import "@/styles/base.css";
import { createApp } from "vue";
import App from "./app.vue";
import { router } from "./router";

createApp(App)
  .use(router)
  .mount("#app");
