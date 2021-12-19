import "./config/scripts/index.js";
import { mainConfig } from "./main.config";
import "./styles/index.scss";

const { app, store, router, i18n, breakpoint } = mainConfig(app);

app.use(store).use(router).use(i18n).use(breakpoint).mount("#app");
