<script>
import { h } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { routes } from "../../router/routes";

export default {
  name: "DevPopup",
  data() {
    return {
      lastPath: "/",
    };
  },
  methods: {
    savePath() {
      if (this.$route.meta.isDev) return;
      this.lastPath = this.$route.fullPath;
    },
  },
  render() {
    const isInactiveDevRoute = (route) =>
      route.meta?.isDev && route.path !== this.$route.fullPath;
    const createRouterLink = (route) =>
      h(RouterLink, {
        to: route.path,
        onClick: this.savePath,
        innerHTML: route.name,
      });

    const links = routes
      .filter((route) => isInactiveDevRoute(route))
      .map((route) => createRouterLink(route));

    if (this.$route.meta.isDev)
      links.unshift(
        h(RouterLink, { to: this.lastPath, innerHTML: "&#129144; Back to app" })
      );

    return h("div", { class: "snt-dev-popup" }, { default: () => links });
  },
};
</script>

<style scoped lang="scss">
.snt-dev-popup {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  & > * {
    padding: 4px 8px;
    color: white;
    opacity: 0.5;
    background: #111d;
    &:hover {
      opacity: 0.7;
    }
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
  }
}
</style>
