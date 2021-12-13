<template>
  <div>
    <div class="snt-flex">
      <router-link to="/development/documentation">Documentation</router-link>
      <router-link to="/development/inputs">Test inputs</router-link>
      <router-link to="/development/playground">Playground</router-link>
      <router-link to="/development#modal">Modal</router-link>
      <router-link to="/development#modal-boxed">Modal Boxed</router-link>
      <router-link to="/development#overlay">Overlay</router-link>
      <button>Button</button>
    </div>

    <snt-modal hash="#modal">
      <p>I am a modal</p>
      <pre v-for="n in 100" :key="n">Yes {{ n }}!</pre>
    </snt-modal>

    <snt-overlay hash="#overlay">
      <p>I am an overlay</p>
      <pre v-for="n in 100" :key="n">Yes {{ n }}!</pre>
    </snt-overlay>

    <div
      style="position: relative; width: 700px; height: 200px; background: #ddd"
    >
      <snt-modal hash="#modal-boxed" disableTeleport>
        <p>I am a boxed modal</p>
        <pre v-for="n in 100" :key="n">Yes {{ n }}!</pre>
      </snt-modal>
    </div>

    <pre v-for="n in 100" :key="n">Yes {{ n }}!</pre>
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
