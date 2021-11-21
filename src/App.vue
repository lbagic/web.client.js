<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--snt-app-background);
  color: var(--snt-app-color);
}
</style>
