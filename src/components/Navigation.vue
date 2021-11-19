<template>
  <div style="width: 100vw">
    <nav class="navigation container-expand">
      <router-link
        v-for="route in routes"
        :key="route.name"
        v-bind="route.$attrs"
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
      <router-link to="/test" :class="navItemClass">Test</router-link>
    </nav>
  </div>
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
      const $attrs = { class: this.navItemClass };
      const userRoutes = [
        {
          name: "Home",
          innerHtml: "Logo",
          $attrs: { class: "flex align-items" },
        },
        { name: "Test", $attrs },
      ];
      const visitorRoutes = [
        {
          name: "Login",
          innerHtml: "Logo",
          $attrs: { class: "flex align-items" },
        },
        { name: "Login", $attrs },
        { name: "Register", $attrs },
      ];
      const routes = this.$isLoggedIn ? userRoutes : visitorRoutes;

      return routes.map((el) => {
        const route = this.$routes.find((route) => el.name === route.name);
        if (!route) throw new Error(`Can't find route with name "${el.name}"`);
        const to = route.path;
        return {
          innerHtml: el.innerHtml ?? el.name,
          $attrs: { ...el.$attrs, to },
        };
      });
    },
    navItemClass() {
      return "flex align-items snt-animate-underline button primary";
    },
  },
};
</script>

<style scoped lang="scss">
.snt-animate-underline::after {
  height: 3px;
}
.navigation {
  display: flex;
  overflow-x: auto;
  background: var(--snt-color-primary);
  color: var(--snt-color-light);
  & > * {
    padding: 1rem;
  }
  & > * + * {
    font-size: 12px;
  }
}
</style>
