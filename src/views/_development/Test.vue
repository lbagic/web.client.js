<template>
  <div>
    <div class="snt-flex">
      <router-link to="/development/documentation">Documentation</router-link>
      <router-link to="/development/inputs">Test inputs</router-link>
      <router-link to="/development/playground">Playground</router-link>
      <router-link to="/development#modal">Modal</router-link>
      <router-link to="/development#modal-boxed">Modal Boxed</router-link>
      <router-link to="/development#overlay">Overlay</router-link>
    </div>
    <snt-modal hash="#modal">I am a modal</snt-modal>
    <snt-overlay hash="#overlay">I am an overlay</snt-overlay>
    <div style="position: relative; width: 700px; height: 200px">
      <snt-modal hash="#modal-boxed">I am a boxed modal</snt-modal>
    </div>
    <pre v-for="n in 100" :key="n">
      Yes
      I
      AM
      {{ n }}
    </pre>
  </div>
</template>

<script>
import SntModal from "../../components/utils/SntModal.vue";
import SntOverlay from "../../components/utils/SntOverlay.vue";
export default {
  components: { SntModal, SntOverlay },
  name: "Test",
};
</script>

<style scoped lang="scss"></style>
