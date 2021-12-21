<template>
  <p>Props: <i>(none)</i></p>
  <snt-button>Button</snt-button>
  <p>Props: <i>large</i></p>
  <snt-button large>Button</snt-button>
  <p>Props: <i>expand</i></p>
  <snt-button expand>Button</snt-button>
  <p>Props: <i>type="outline"</i></p>
  <snt-button type="outline">Button</snt-button>
  <p>Props: <i>type="text"</i></p>
  <snt-button type="text">Button</snt-button>
  <p>Props: <i>color="secondary"</i></p>
  <snt-button color="secondary">Button</snt-button>
  <p>Props: <i>to="/examples/snt-button"</i></p>
  <snt-button to="/examples/snt-button">Router link</snt-button>
  <p>Props: <i>href="/examples/snt-button"</i></p>
  <snt-button href="/examples/snt-button">Anchor element</snt-button>
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
i {
  font-weight: bold;
}
</style>
