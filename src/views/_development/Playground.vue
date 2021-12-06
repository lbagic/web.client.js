<template>
  <div>
    <snt-input
      :model="{ password: form }"
      :validator="
        (val) => {
          $log({ val });
          return val === form.confirm.value ? true : 'woops';
        }
      "
      label="PASS"
    />
    <snt-input :model="{ confirm: form }" label="CONFIRM" />
    <snt-button :disabled="!$formValid(form)">Submit</snt-button>
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput, SntButton },
  name: "Playground",
  data() {
    return {
      number: "",
      form: {
        password: {
          value: "qweqwe",
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
