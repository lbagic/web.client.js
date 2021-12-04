<template>
  <div>
    <p>I am a formgroup</p>
    <slot></slot>
    <p>vModel: {{ form }}</p>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: ["form"],
  mounted() {
    console.log(this.$slots);
  },
};
</script>

<style scoped lang="scss"></style>
