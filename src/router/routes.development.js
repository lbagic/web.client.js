export const addDevelopmentRoutes = (routes) => {
  routes.push({
    path: "/development",
    component: () => import("../views/_development/DevelopmentHome.vue"),
    children: [
      {
        path: "",
        name: "Test",
        component: () => import("../views/_development/Test.vue"),
      },
      {
        path: "playground",
        name: "Playground",
        component: () => import("../views/_development/Playground.vue"),
      },
      {
        path: "inputs",
        name: "TestInputs",
        component: () => import("../views/_development/TestInputs.vue"),
      },
      {
        path: "documentation",
        name: "Documentation",
        component: () => import("../views/_development/Documentation.vue"),
      },
    ],
  });
};
