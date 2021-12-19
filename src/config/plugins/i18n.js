import { createI18n } from "vue-i18n/index";
import en from "../translations/en.json";

export const i18n = createI18n({
  locale: "en",
  messages: { en },
});

if (process.env.NODE_ENV !== "production")
  i18n.global.missing = (locale, key) =>
    console.warn(`[i18n] Translation missing: ${locale} ${key}`);
