<template>
  <header class="navigation-wrapper">
    <nav class="navigation container-expand">
      <router-link
        v-for="route in routes"
        :key="route.name"
        v-bind="route.$attrs"
        @click="snap"
        >{{ route.innerHtml }}</router-link
      >
      <button
        v-if="$isLoggedIn"
        class="snt-animate-underline primary"
        style="margin-left: auto"
        @click="$store.dispatch('AccountModule/logout')"
      >
        <icon icon="Off" color="light" />
      </button>
    </nav>
  </header>
</template>

<script>
import Icon from "./utils/Icon.vue";

export default {
  components: { Icon },
  name: "Navigation",
  data() {
    return {
      startRoutes: [{ name: "Home", text: "Logo" }],
    };
  },
  computed: {
    routes() {
      const logoClass = "flex align-items snt-f3";
      const linkClass = "flex align-items snt-animate-underline snt-f";

      const routes = this.$isLoggedIn
        ? [
            {
              name: "Home",
              innerHtml: "Logo",
              $attrs: { class: logoClass },
            },
          ]
        : [
            {
              name: "Login",
              innerHtml: "Logo",
              $attrs: { class: logoClass },
            },
            { name: "Login", $attrs: { class: linkClass } },
            { name: "Register", $attrs: { class: linkClass } },
          ];

      if (process.env.NODE_ENV !== "production")
        routes.push({ name: "Test", $attrs: { class: linkClass } });

      return routes.map((el) => {
        const route = this.$routes.find((route) => el.name === route.name);
        if (!route) throw new Error(`Can't find route with name "${el.name}"`);

        return {
          innerHtml: el.innerHtml ?? el.name,
          $attrs: { ...el.$attrs, to: route.path },
        };
      });
    },
  },
  methods: {
    snap({ target }) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.snt-animate-underline::after {
  height: 3px;
}
.navigation-wrapper {
  display: flex;
  overflow-x: auto;
  background: var(--snt-color-primary);
  // scroll-snap-type: x mandatory;
}
.navigation {
  width: 100%;
  display: flex;
  color: var(--snt-color-light);
  & > * {
    // scroll-snap-align: start end;
    padding: 1rem;
  }
}
</style>
