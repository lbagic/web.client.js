<template>
  <p>label="Enter text" required</p>
  <snt-input label="Text label" required type="text" />
  <p>help="Help text"</p>
  <snt-input help="Help text" />
  <p>type="range"</p>
  <snt-input type="range" />
  <p>type="radio"</p>
  <snt-input type="radio" />
  <p>type="select" :options="[1,2,3]"</p>
  <snt-input type="select" :options="[1, 2, 3]" />
  <snt-input />
</template>

<script>
import SntInput from "../utils/SntInput.vue";
export default {
  components: { SntInput },
  name: "ExampleInput",
};
</script>

<style scoped lang="scss"></style>
