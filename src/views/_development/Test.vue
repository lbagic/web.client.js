<template>
  <div class="wrapper">
    <router-link to="/development/documentation">Documentation</router-link>
    <router-link to="/development/inputs">Test inputs</router-link>
    <datepicker ref="datepicker" v-model="qwe" />
    <pre>{{ qwe }}</pre>
  </div>
</template>

<script>
import "vue3-date-time-picker/dist/main.css";
import Datepicker from "vue3-date-time-picker";

export default {
  name: "Test",
  components: { Datepicker },
  mounted() {},
  data() {
    return {
      qwe: new Date(),
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
