<template>
  <router-link to="#hash-modal">hash="#hash-modal"</router-link>
  <snt-modal hash="#hash-modal">I am a #hash-modal</snt-modal>

  <router-link to="?query-modal">query="query-modal"</router-link>
  <snt-modal query="query-modal">I am a query-modal</snt-modal>

  <router-link to="#bg-modal"
    >background="secondary" opacity="1" hideCloseIcon</router-link
  >
  <snt-modal hash="#bg-modal" background="secondary" opacity="1" hideCloseIcon
    >I am a #bg-modal</snt-modal
  >
</template>

<script>
import SntModal from "../utils/SntModal.vue";
export default {
  components: { SntModal },
  name: "ExampleModal",
};
</script>

<style scoped lang="scss">
a {
  display: block;
}
</style>
