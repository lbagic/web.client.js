<template>
  <navigation />
  <router-view />
  <!-- elements out of document flow -->
  <snt-toast />
  <component :is="AppDocs" />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import Navigation from "./components/Navigation.vue";
import SntToast from "./components/utils/SntToast.vue";

export default {
  name: "App",
  components: { Navigation, SntToast },
  computed: {
    AppDocs() {
      return process.env.NODE_ENV === "development"
        ? defineAsyncComponent(() => import("@/components/AppDocs.vue"))
        : undefined;
    },
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  background: var(--snt-app-background);
  color: var(--snt-app-color);
}
</style>
