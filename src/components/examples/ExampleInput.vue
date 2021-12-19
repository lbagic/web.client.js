<template>
  <snt-input required label="text" type="text" />
  <snt-input required label="email" type="email" />
  <snt-input required label="password" type="password" />
  <snt-input required label="search" type="search" />
  <snt-input required label="tel" type="tel" />
  <snt-input required label="url" type="url" />
  <snt-input required label="color" type="color" />
  <snt-input required label="number" type="number" />
  <snt-input required label="range" type="range" />
  <snt-input required label="checkbox" type="checkbox" />
  <snt-input required label="radio" type="radio" />
  <snt-input required label="file" type="file" />
  <snt-input required label="textarea" type="textarea" />
  <snt-input required label="select" type="select" />
  <snt-input required label="date" type="date" />
  <snt-input required label="time" type="time" />
  <snt-input required label="month" type="month" />
</template>

<script>
import SntInput from "../utils/SntInput.vue";
export default {
  components: { SntInput },
  name: "ExampleInput",
};
</script>

<style scoped lang="scss"></style>
