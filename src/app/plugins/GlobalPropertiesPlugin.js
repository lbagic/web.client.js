import { store } from "../../store/store";

export default {
  install(app) {
    Object.entries({
      $isLoggedIn: store.getters["AccountModule/isLoggedIn"],
      $log: console.log,
    }).forEach(([key, value]) => (app.config.globalProperties[key] = value));
  },
};
