import BreakpointPlugin from "./app/plugins/BreakpointPlugin";
import CssVariablesPlugin from "./app/plugins/CssVariablesPlugin";
import GlobalPropertiesPlugin from "./app/plugins/GlobalPropertiesPlugin";
import "./app/startup-scripts/index.js";
import { configApp } from "./main.config.js";
import { router } from "./router/router.js";
import { store } from "./store/store.js";
import "./styles/index.scss";

const { app, i18n } = configApp();

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(GlobalPropertiesPlugin)
  .use(BreakpointPlugin)
  .use(CssVariablesPlugin)
  .mount("#app");
