<template>
  <snt-input required label="type=text" type="text" />
  <snt-input required label="type=email" type="email" />
  <snt-input required label="type=password" type="password" />
  <snt-input required label="type=search" type="search" />
  <snt-input required label="type=tel" type="tel" />
  <snt-input required label="type=url" type="url" />
  <snt-input required label="type=color" type="color" />
  <snt-input required label="type=number" type="number" />
  <snt-input required label="type=range" type="range" />
  <snt-input required label="type=checkbox" type="checkbox" />
  <snt-input required label="type=radio" type="radio" />
  <snt-input required label="type=file" type="file" />
  <snt-input required label="type=textarea" type="textarea" />
  <snt-input required label="type=select" type="select" />
  <snt-input required label="type=date" type="date" />
  <snt-input required label="type=time" type="time" />
  <snt-input required label="type=month" type="month" />
</template>

<script>
import SntInput from "../utils/SntInput.vue";
export default {
  components: { SntInput },
  name: "ExampleInput",
};
</script>

<style scoped lang="scss"></style>
