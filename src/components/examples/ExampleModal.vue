<template>
  <router-link to="#hash-modal">Props: <i>hash="#hash-modal"</i></router-link>
  <snt-modal hash="#hash-modal">I am a #hash-modal</snt-modal>

  <router-link to="?query-modal">Props: <i>query="query-modal"</i></router-link>
  <snt-modal query="query-modal">I am a query-modal</snt-modal>

  <router-link to="#bg-modal"
    >Props:
    <i
      >hash="#bg-modal" background="secondary" opacity="1" hideCloseIcon</i
    ></router-link
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
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
}
i {
  font-weight: bold;
}
</style>
