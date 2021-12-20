import { developmentRoutes } from "./routes.development";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { userOnly: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/authentication/Login.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/authentication/Register.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("../views/authentication/ForgotPassword.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/reset-password",
    name: "Reset password",
    component: () => import("../views/authentication/ResetPassword.vue"),
    meta: { visitorOnly: true },
  },
];

if (process.env.NODE_ENV === "development") routes.push(...developmentRoutes);
