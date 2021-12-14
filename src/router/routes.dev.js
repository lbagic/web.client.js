export const devRoutes =
  process.env.NODE_ENV === "development"
    ? [
        {
          path: "/dev/docs",
          name: "Docs",
          component: () => import("../views/dev/Docs.vue"),
        },
        {
          path: "/dev/test",
          name: "Test",
          component: () => import("../views/dev/Test.vue"),
        },
        {
          path: "/dev/inputs",
          name: "Inputs",
          component: () => import("../views/dev/TestInputs.vue"),
        },
      ]
    : [];
