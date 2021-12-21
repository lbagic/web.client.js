<template>
  <p>Props: <i>icon="Home"</i></p>
  <snt-icon icon="Home" />
  <p>Props: <i>icon="Home" color="secondary"</i></p>
  <snt-icon icon="Home" color="secondary" />
  <p>Props: <i>icon="Home" button</i></p>
  <snt-icon icon="Home" button />
  <p>Props: <i>icon="Home" button hoverColor="ternary"</i></p>
  <snt-icon icon="Home" button hoverColor="ternary" />
  <p>Props: <i>icon="Home" scale="2"</i></p>
  <snt-icon icon="Home" scale="2" />
</template>

<script>
import SntIcon from "../utils/SntIcon.vue";
export default {
  components: { SntIcon },
  name: "ExampleIcon",
};
</script>

<style scoped lang="scss">
i {
  font-weight: bold;
}
</style>
