import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./config/plugins/i18n.js";
import { breakpoint } from "./config/plugins/sntBreakpoints.js";
import { router } from "./router/router.js";
import { store } from "./store/store.js";

export const mainConfig = () => {
  const app = createApp(App);

  // global properties
  const global = app.config.globalProperties;
  global.$log = process.env !== "production" ? console.log : () => {};
  global.$formValid = (form) =>
    form?._valid && Object.values(form._valid)?.every((el) => el);
  global.$isLoggedIn = store.getters["AccountModule/isLoggedIn"];

  return {
    app,
    i18n,
    breakpoint,
    router,
    store,
  };
};
