<template>
  <navigation />
  <router-view />
  <component :is="developmentPopup" v-if="developmentPopup" />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
  computed: {
    developmentPopup() {
      return process.env.NODE_ENV === "development"
        ? defineAsyncComponent(() =>
            import("@/views/_development/DevelopmentPopup.vue")
          )
        : undefined;
    },
  },
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
