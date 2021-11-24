<template>
  <div>
    <datepicker v-model="date" @cleared="trigger" />
    <pre>{{ actual }}</pre>
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
      date: undefined,
    };
  },
  computed: {
    actual() {
      return {
        date: this.date,
      };
    },
  },
  methods: {
    trigger(x) {
      console.log("triggered", x);
    },
  },
};
</script>

<style scoped lang="scss"></style>
