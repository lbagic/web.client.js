import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./app/translations/en.json";

export const configApp = () => {
  const app = createApp(App);

  const i18n = createI18n({
    locale: "en",
    messages: { en },
  });

  return { app, i18n };
};

export const configuration = {
  defaultApplicationTitle: "Application",
  defaultUserRoute: "/",
  defaultVisitorRoute: "/login",
};
