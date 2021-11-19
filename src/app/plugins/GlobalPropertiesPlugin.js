import { routes } from "../../router/routes";
import { store } from "../../store/store";
import { capitalize } from "../utils/capitalize";
import { cssVariables } from "../utils/cssVariables";

export default {
  install(app) {
    Object.entries({
      $cssVariables: cssVariables,
      $routes: routes,
      $capitalize: capitalize,
      $isLoggedIn: store.getters["AccountModule/isLoggedIn"],
      $userType: store.getters["AccountModule/userType"],
      $log: console.log,
    }).forEach(([key, value]) => (app.config.globalProperties[key] = value));
  },
};
