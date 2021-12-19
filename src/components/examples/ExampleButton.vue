<template>
  <p>(default)</p>
  <snt-button>Button</snt-button>
  <p>large</p>
  <snt-button large>Button</snt-button>
  <p>expand</p>
  <snt-button expand>Button</snt-button>
  <p>type="outline"</p>
  <snt-button type="outline">Button</snt-button>
  <p>type="text"</p>
  <snt-button type="text">Button</snt-button>
  <p>color="secondary"</p>
  <snt-button color="secondary">Button</snt-button>
  <p>color="ternary"</p>
  <snt-button color="ternary">Button</snt-button>
  <p>to="/examples/snt-button" (router-link)</p>
  <snt-button to="/examples/snt-button">Button</snt-button>
  <p>href="/examples/snt-button" (anchor)</p>
  <snt-button href="/examples/snt-button">Button</snt-button>
</template>

<script>
import SntButton from "../utils/SntButton.vue";
export default {
  components: { SntButton },
  name: "ExampleButtons",
};
</script>

<style scoped lang="scss">
.wrap {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  justify-items: flex-start;
}
</style>
