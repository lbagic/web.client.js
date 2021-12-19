<template>
  <div>
    <snt-input label="Default" required />
    <snt-input :model="{ model: form }" label="Model" required />
    <snt-input
      :model="{ externalModel: form }"
      label="External Model"
      required
    />
    <button @click="swapZero">zero</button>
    <button @click="swapOne">one</button>
    <button @click="swapNone">none</button>
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";

const zero = {
  model: "Zero",
  externalModel: "Zero",
};
const one = {
  model: "One",
  externalModel: "One",
};
const none = {
  model: "",
  externalModel: "",
};
export default {
  components: { SntInput },
  name: "Test",
  data() {
    return {
      form: {
        model: "",
        externalModel: "",
      },
    };
  },
  methods: {
    swapZero() {
      this.form = zero;
    },
    swapOne() {
      this.form = one;
    },
    swapNone() {
      this.form = none;
    },
  },
};
</script>

<style scoped lang="scss">
button {
  padding: 0.5rem;
}
</style>
