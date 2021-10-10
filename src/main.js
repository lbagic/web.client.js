import { configureApp } from "./main.config";
import BreakpointPlugin from "./plugins/BreakpointPlugin";
import CssVariablesPlugin from "./plugins/CssVariablesPlugin";
import GlobalPropertiesPlugin from "./plugins/GlobalPropertiesPlugin";
import { router } from "./router/router.js";
import { store } from "./store/store.js";
import "./styles/index.scss";

const { app, i18n } = configureApp();

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(GlobalPropertiesPlugin)
  .use(BreakpointPlugin)
  .use(CssVariablesPlugin)
  .mount("#app");
