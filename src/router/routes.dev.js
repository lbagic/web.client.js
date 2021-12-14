export const devRoutes = [
  {
    path: "/dev/test",
    name: "&#9876; Test",
    component: () => import("../views/dev/Test.vue"),
    meta: { isDev: true },
  },
  {
    path: "/dev/docs",
    name: "&#9874; Docs",
    component: () => import("../views/dev/Docs.vue"),
    meta: { isDev: true },
  },
  // {
  //   path: "/dev/inputs",
  //   name: "Inputs",
  //   component: () => import("../views/dev/TestInputs.vue"),
  //   meta: { isDev: true },
  // },
];
