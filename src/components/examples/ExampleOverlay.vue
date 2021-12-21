<template>
  <router-link to="#hash-overlay"
    >Props: <i>hash="#hash-overlay"</i></router-link
  >
  <snt-overlay hash="#hash-overlay">I am a #hash-overlay</snt-overlay>

  <router-link to="?query-overlay"
    >Props: <i>query="query-overlay"</i></router-link
  >
  <snt-overlay query="query-overlay">I am a query-overlay</snt-overlay>

  <router-link to="#bg-modal"
    >Props:
    <i
      >hash="#bg-modal" background="ternary-lightest" hideCloseIcon center</i
    ></router-link
  >
  <snt-overlay
    hash="#bg-modal"
    background="ternary-lightest"
    hideCloseIcon
    center
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
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
}
i {
  font-weight: bold;
}
</style>
