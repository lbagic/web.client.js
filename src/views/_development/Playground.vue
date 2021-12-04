<template>
  <div>
    <snt-input :model="{ confirm: form }" />
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
      form: {
        _valid: true,
        // _fieldsValid: { email: true },
        email: "",
        password: "",
        confirm: {
          type: "password",
          value: "",
          validator: (ctx, value) =>
            ctx.password === value ? "Same passwords." : true,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
