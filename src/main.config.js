import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import "./config/date-inconsistencies.js";
import { initializeXssAlert } from "./config/xss-alert.js";
import en from "./translations/en.json";

export const configureApp = () => {
  initializeXssAlert();
  const app = createApp(App);

  const i18n = createI18n({
    locale: "en",
    messages: { en },
  });

  return { app, i18n };
};
