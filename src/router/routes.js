export const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/onboarding/Login.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/onboarding/Register.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("../views/onboarding/ForgotPassword.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/reset-password",
    name: "Reset password",
    component: () => import("../views/onboarding/ResetPassword.vue"),
    meta: { visitorOnly: true },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
];

if (process.env.NODE_ENV === "development") {
  routes.push({
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  });
}
