<template>
  <div id="application">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
};
</script>

<style scoped lang="scss">
#application {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
