import { createRouter, createWebHistory } from "vue-router";
import { appConfig } from "../config";
import { store } from "../store/store";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  router.referrer = from.fullPath;
  document.title = to.meta?.title ?? appConfig.title;

  const isLoggedIn = store.getters["AccountModule/isLoggedIn"];
  const homePage = isLoggedIn ? appConfig.userHome : appConfig.visitorHome;
  const authorizeLocation = (route) => {
    if (!route.matched.length) return false;
    return isLoggedIn ? !route.meta?.visitorOnly : !route.meta?.userOnly;
  };

  const isAuthorized = authorizeLocation(to);
  const wasAuthorized = authorizeLocation(from);
  const error404 = !to.matched.length;

  if (!isAuthorized) return next(wasAuthorized ? false : homePage);
  else if (error404) return next(homePage);
  else next();
});
