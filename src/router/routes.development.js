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
        name: "snt-button",
        component: () => import("../components/examples/ExampleButton.vue"),
      },
      {
        path: "snt-icon",
        name: "snt-icon",
        component: () => import("../components/examples/ExampleIcon.vue"),
      },
      {
        path: "snt-modal",
        name: "snt-modal",
        component: () => import("../components/examples/ExampleModal.vue"),
      },
      {
        path: "snt-overlay",
        name: "snt-overlay",
        component: () => import("../components/examples/ExampleOverlay.vue"),
      },
      {
        path: "snt-toast",
        name: "snt-toast",
        component: () => import("../components/examples/ExampleToast.vue"),
      },
      {
        path: "snt-input",
        name: "snt-input",
        component: () => import("../components/examples/ExampleInput.vue"),
      },
      {
        path: "html-table",
        name: "html table",
        component: () => import("../components/examples/ExampleTable.vue"),
      },
      {
        path: "vuex-module",
        name: "vuex module",
        component: () => import("../components/examples/ExampleVuexModule.vue"),
      },
      {
        path: "breakpoints",
        name: "breakpoint plugin",
        component: () =>
          import("../components/examples/ExampleBreakpoints.vue"),
      },
    ],
  },
];
