module.exports = {
  title: "Sintezis Web Stack",
  description: "Just playing around.",
  themeConfig: {
    sidebar: {
      "/": getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "Getting Started", link: "/" },
        { text: "Stack Overview", link: "/guide/overview" },
        { text: "Roadmap", link: "/guide/roadmap" },
      ],
    },
    // {
    //   text: "In-Depth",
    //   children: [
    //     {
    //       text: "Components",
    //       link: "/in-depth/components",
    //     },
    //   ],
    // },
  ];
}
