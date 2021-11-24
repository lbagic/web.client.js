<template>
  <div>
    <input v-model="my.basic" type="time" />
    <datepicker v-model="my.custom" teleport="#mmm" />
    <pre>values: {{ my }}</pre>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

export default {
  name: "Test",
  components: { Datepicker },
  data() {
    return {
      my: {
        basic: undefined,
        custom: undefined,
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
