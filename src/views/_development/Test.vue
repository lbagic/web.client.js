<template>
  <div class="wrapper">
    <snt-button to="/development#query" text>Test query</snt-button>
    <snt-button to="/development/inputs" text>Here</snt-button>
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
