<template>
  <div v-if="!$route.meta.isDev" id="application">
    <navigation />
    <router-view />
  </div>
  <div v-else id="dev-application">
    <router-view />
  </div>
  <component :is="devPopup" />
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
    devPopup() {
      return process.env.NODE_ENV === "development"
        ? defineAsyncComponent(() => import("@/views/dev/DevPopup.vue"))
        : undefined;
    },
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
#application {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  background: var(--snt-app-background);
  color: var(--snt-app-color);
}
</style>
