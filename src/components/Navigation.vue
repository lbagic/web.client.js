<template>
  <header class="navigation-wrapper">
    <nav class="navigation snt-container-expand">
      <router-link to="/" class="navigation-link snt-fs-2">Logo</router-link>
      <!-- User routes -->
      <template v-if="$getters['AccountModule/isLoggedIn']">
        <button
          class="navigation-link snt-animate-underline"
          style="margin-left: auto"
          @click="$dispatch('AccountModule/logout')"
        >
          <snt-icon icon="power" color="light" />
        </button>
      </template>
      <!-- Visitor routes -->
      <template v-else>
        <router-link
          to="/login"
          class="navigation-link snt-animate-underline snt-fs--1"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="navigation-link snt-animate-underline snt-fs--1"
          >Register</router-link
        >
        <button
          style="margin-left: auto"
          class="navigation-link snt-animate-underline snt-fs--1"
          @click="
            $commit('AccountModule/setToken', 'TOKEN');
            $router.push('/');
          "
        >
          [test login]
        </button>
      </template>
    </nav>
  </header>
</template>

<script>
import SntIcon from "./utils/SntIcon.vue";

export default {
  components: { SntIcon },
  name: "Navigation",
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
  position: sticky;
  top: 0;
  height: var(--snt-nav-height);
}
.navigation {
  min-width: fit-content;
  display: flex;
  color: var(--snt-color-light);
  & > * {
    box-shadow: none;
    padding: 8px 16px;
    color: inherit;
    outline: none;
  }
}
.navigation-link {
  display: flex;
  align-items: center;
}
</style>
