<template>
  <div class="wrapper">
    <router-link to="/development/documentation">Documentation</router-link>
    <router-link to="/development/inputs">Test inputs</router-link>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      qwe: "asdf",
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 1rem;
  & > * + * {
    margin-left: 1rem;
  }
}
</style>
