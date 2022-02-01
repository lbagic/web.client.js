import { createApp } from "vue";
import App from "./App.vue";
import { breakpoint } from "./config/plugins/breakpoint.js";
import { i18n } from "./config/plugins/i18n.js";
import "./config/scripts/index.js";
import { router } from "./router/router.js";
import { store } from "./store/store.js";
import "./styles/index.scss";

const app = createApp(App);

Object.assign(app.config.globalProperties, {
  $validate: (form) =>
    form?._valid && Object.values(form._valid)?.every((el) => el),
  $log: process.env.NODE_ENV !== "production" ? console.log : () => {},
  $commit: store.commit,
  $dispatch: store.dispatch,
  $getters: store.getters,
  $state: store.state,
});

app.use(store).use(router).use(i18n).use(breakpoint).mount("#app");
