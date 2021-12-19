export const developmentRoutes = [
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/dev/Test.vue"),
  },
  {
    path: "/test-inputs",
    name: "Test inputs",
    component: () => import("../views/dev/TestInputs.vue"),
  },
  {
    path: "/examples",
    name: "Examples",
    component: () => import("../views/dev/Examples.vue"),
    children: [
      {
        path: "snt-button",
        component: () => import("../components/examples/ExampleButton.vue"),
      },
      {
        path: "snt-icon",
        component: () => import("../components/examples/ExampleIcon.vue"),
      },
      {
        path: "snt-modal",
        component: () => import("../components/examples/ExampleModal.vue"),
      },
      {
        path: "snt-overlay",
        component: () => import("../components/examples/ExampleOverlay.vue"),
      },
      {
        path: "snt-toast",
        component: () => import("../components/examples/ExampleToast.vue"),
      },
      {
        path: "snt-input",
        component: () => import("../components/examples/ExampleInput.vue"),
      },
    ],
  },
];
