<template>
  <div>
    <snt-input :model="{ password: form }" label="PASS" />
    <snt-input :model="{ confirm: form }" label="CONFIRM" />
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput },
  name: "Playground",
  data() {
    return {
      number: "",
      form: {
        // _valid: true,
        // _fieldsValid: { email: true },
        password: {
          value: "",
          validator: (ctx, value) =>
            value === ctx.confirm.value ? true : "passwords do not match",
        },
        confirm: {
          value: "",
          validator: (ctx, value) =>
            value === ctx.password.value ? true : "passwords do not match",
        },
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
