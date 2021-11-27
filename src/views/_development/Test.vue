<template>
  <div class="wrapper">
    <snt-button to="/development#hash" text>/development#hash</snt-button>
    <snt-button to="/development?query&qwe=22" text
      >/development?query</snt-button
    >
    <snt-button to="/development" text>/development</snt-button>
    <snt-button text @click="$refs.overlay.open()">Open overlay</snt-button>
    <snt-button text @click="$refs.modal.open()">Open modal</snt-button>

    <snt-modal hash="#hash">
      <pre v-for="num in 100" :key="num">{{ num }}</pre>
    </snt-modal>
    <snt-modal query="query" fill="primary">
      <p>Primary overlay</p>
    </snt-modal>
    <snt-modal ref="overlay">CLICK OVERLAY</snt-modal>
    <snt-modal ref="modal">CLICK MODAL</snt-modal>

    <pre>Hash: {{ $route.hash }}</pre>
    <pre>Query: {{ $route.query }}</pre>
    <pre v-for="num in 100" :key="num">{{ num }}</pre>
  </div>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";
import SntModal from "../../components/utils/SntModal.vue";

export default {
  components: { SntButton, SntModal },
  name: "Test",
};
</script>

<style scoped lang="scss">
.wtf {
  background: hotpink;
}
.wrapper {
  padding: 1rem;
  & > * + * {
    margin-left: 1rem;
  }
}
</style>
