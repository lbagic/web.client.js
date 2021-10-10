import { routes } from "../router/routes";
import { cssVariables } from "../utils/cssVariables";

export default {
  install(app) {
    Object.entries({
      $cssVariables: cssVariables,
      $routes: routes,
    }).forEach(([key, value]) => (app.config.globalProperties[key] = value));
  },
};
