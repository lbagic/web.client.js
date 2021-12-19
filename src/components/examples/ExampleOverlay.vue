<template>
  <router-link to="#hash-overlay">hash="#hash-overlay"</router-link>
  <snt-overlay hash="#hash-overlay">I am a #hash-overlay</snt-overlay>

  <router-link to="?query-overlay">query="query-overlay"</router-link>
  <snt-overlay query="query-overlay">I am a query-overlay</snt-overlay>

  <router-link to="#bg-modal"
    >background="ternary" hideCloseIcon center</router-link
  >
  <snt-overlay hash="#bg-modal" background="ternary" hideCloseIcon center
    >I am a #bg-overlay</snt-overlay
  >
</template>

<script>
import SntOverlay from "../utils/SntOverlay.vue";
export default {
  components: { SntOverlay },
  name: "ExampleModal",
};
</script>

<style scoped lang="scss">
a {
  display: block;
}
</style>
