export default {
  lang: "en-US",
  title: "Sintezis Web Stack",
  description: "Sintezis Web Stack Documentation.",
  themeConfig: {
    sidebar: {
      "/": getSidebar(),
    },
    nav: [
      { text: "Stack Overview", link: "/overview" },
      {
        text: "Guides",
        link: "/guide/components",
        activeMatch: "^/guide/",
      },
    ],
  },
};

function getSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "Getting Started", link: "/" },
        { text: "Stack Overview", link: "/overview" },
        { text: "Roadmap", link: "/roadmap" },
      ],
    },
    {
      sidebarDepth: 4,
      text: "In-Depth Guides",
      children: [
        { text: "Components", link: "/guide/components" },
        { text: "Plugins", link: "/guide/plugins" },
        { text: "Services", link: "/guide/services" },
        { text: "Vuex (State Management)", link: "/guide/state-management" },
        { text: "Stylesheets", link: "/guide/styles" },
      ],
    },
  ];
}
