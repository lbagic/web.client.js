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
  grid-template-rows: 60px 1fr;
}
</style>
