<template>
  <div><input ref="input" type="text" required @input="log" /></div>
</template>

<script>
export default {
  name: "Test",
  mounted() {
    console.log(this.$refs.input.validity.valid);
  },
  methods: {
    log() {
      console.log(this.$refs.input.validity.valid);
    },
  },
};
</script>

<style scoped lang="scss"></style>
