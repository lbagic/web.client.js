<template>
  <p>Props: <i>icon="home"</i></p>
  <snt-icon icon="home" />
  <p>Props: <i>icon="home" color="secondary"</i></p>
  <snt-icon icon="home" color="secondary" />
  <p>Props: <i>icon="home" button</i></p>
  <snt-icon icon="home" button />
  <p>Props: <i>icon="home" button hoverColor="ternary"</i></p>
  <snt-icon icon="home" button hoverColor="ternary" />
  <p>Props: <i>icon="home" scale="2"</i></p>
  <snt-icon icon="home" scale="2" />
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
