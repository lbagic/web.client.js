<template>
  <navigation />
  <router-view />
  <component :is="developmentPopup" />
  <snt-toast />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import Navigation from "./components/Navigation.vue";
import SntToast from "./components/utils/SntToast.vue";

export default {
  name: "App",
  components: { Navigation, SntToast },
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
  min-height: 100%;
  display: grid;
  align-content: start;
  grid-template-rows: auto 1fr;
  background: var(--snt-app-background);
  color: var(--snt-app-color);
}
</style>
