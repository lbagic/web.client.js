<template>
  <p>icon="home"</p>
  <snt-icon icon="Home" />
  <p>icon="home" color="secondary"</p>
  <snt-icon icon="Home" color="secondary" />
  <p>icon="home" button</p>
  <snt-icon icon="Home" button />
  <p>icon="home" button hoverColor="ternary"</p>
  <snt-icon icon="Home" button hoverColor="ternary" />
  <p>icon="home" scale="2"</p>
  <snt-icon icon="Home" scale="2" />
</template>

<script>
import SntIcon from "../utils/SntIcon.vue";
export default {
  components: { SntIcon },
  name: "ExampleIcon",
};
</script>

<style scoped lang="scss"></style>
