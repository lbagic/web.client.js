import { createApp } from "vue";
import App from "./App.vue";
import { breakpoint } from "./config/plugins/breakpoint.js";
import { i18n } from "./config/plugins/i18n.js";
import { router } from "./router/router.js";
import { store } from "./store/store.js";

export const mainConfig = () => {
  const app = createApp(App);

  // global properties
  const global = app.config.globalProperties;
  global.$log = process.env !== "production" ? console.log : () => {};
  global.$validate = (form) =>
    form?._valid && Object.values(form._valid)?.every((el) => el);
  global.$isLoggedIn = store.getters["AccountModule/isLoggedIn"];
  global.$dispatch = store.dispatch;
  global.$commit = store.commit;
  global.$getters = store.getters;
  global.$state = store.state;

  return {
    app,
    i18n,
    breakpoint,
    router,
    store,
  };
};
