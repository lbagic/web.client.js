<template>
  <multiselect v-model="value" :options="options"></multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "Test",
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: ["list", "of", "options"],
    };
  },
};
</script>

<style scoped lang="scss"></style>
