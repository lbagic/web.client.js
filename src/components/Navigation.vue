<template>
  <nav class="navigation container-expand">
    <router-link :to="isLoggedIn ? '/' : '/login'">App</router-link>
    <router-link
      v-for="route in routes"
      :key="route.name"
      class="animate-underline button primary"
      :to="route.path"
      >{{ route.name }}</router-link
    >
    <button
      v-if="isLoggedIn"
      class="animate-underline primary"
      style="margin-left: auto"
      @click="$store.dispatch('AccountModule/logout')"
    >
      <icon icon="Off" />
    </button>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import Icon from "./utils/Icon.vue";

export default {
  components: { Icon },
  name: "Navigation",
  data() {
    return {
      filterRoutes: ["/", "/forgot-password", "/reset-password"],
    };
  },
  computed: {
    ...mapGetters("AccountModule", ["isLoggedIn"]),
    routes() {
      return this.$routes.filter((el) => {
        if (this.filterRoutes.includes(el.path)) return false;
        return this.isLoggedIn ? !el?.meta?.visitorOnly : !el?.meta?.userOnly;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.animate-underline::after {
  height: 3px;
}
.navigation {
  display: flex;
  overflow-x: auto;
  background: var(--color-primary);
  color: var(--color-light);
  & > * + * {
    font-size: 12px;
  }
  & > * {
    padding: 1rem;
  }
}
</style>
