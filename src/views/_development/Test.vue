<template>
  <div class="wrapper">
    <snt-button href="/development">anchor</snt-button>
    <snt-button to="/development" text>router-link</snt-button>
    <snt-button outline>button</snt-button>
    <snt-button outline large>button</snt-button>
    <snt-button outline>button</snt-button>
    <a href="ad">damn</a>
  </div>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";

export default {
  components: { SntButton },
  name: "Test",
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 1rem;
  & > * + * {
    margin-left: 1rem;
  }
}
</style>
