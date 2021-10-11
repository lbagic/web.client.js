import { routes } from "../router/routes";
import { capitalize } from "../utils/capitalize";
import { cssVariables } from "../utils/cssVariables";

export default {
  install(app) {
    Object.entries({
      $cssVariables: cssVariables,
      $routes: routes,
      $capitalize: capitalize,
    }).forEach(([key, value]) => (app.config.globalProperties[key] = value));
  },
};
