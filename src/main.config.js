import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./config/plugins/i18n.js";
import { breakpoint } from "./config/plugins/sntBreakpoints.js";
import { router } from "./router/router.js";
import { store } from "./store/store.js";

export const mainConfig = () => {
  const app = createApp(App);

  const global = app.config.globalProperties;
  global.$log = console.log;
  global.$isLoggedIn = store.getters["AccountModule/isLoggedIn"];

  return {
    app,
    i18n,
    breakpoint,
    router,
    store,
  };
};
