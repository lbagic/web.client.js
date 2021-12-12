<template>
  <div>
    <snt-input :model="{ password: form }" label="PASS" required />
    <snt-input
      :model="{ confirm: form }"
      :validator="(val) => (val === form.password ? true : 'not quite right')"
      label="CONFIRM"
    />
    <snt-button :disabled="!$formValid(form)">Submit</snt-button>
    <input v-model="form.password" type="text" />
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
      form: {
        password: "qweqwe",
        confirm: "",
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
