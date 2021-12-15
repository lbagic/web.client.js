<template>
  <fieldset
    class="snt-container-s my-auto snt-grid snt-card"
    style="--gap: 12px"
  >
    <legend class="snt-fs-2" style="color: var(--snt-color-primary-darker)">
      Register
    </legend>
    <snt-input
      :model="{ email: form }"
      type="email"
      name="email"
      label="Email"
      required
    />
    <snt-input
      :model="{ password: form }"
      type="password"
      name="password"
      label="Password"
      required
    />
    <snt-input
      :model="{ password_confirmation: form }"
      type="password"
      name="password"
      :validator="
        (value) => (value !== form.password ? 'Passwords do not match.' : true)
      "
      label="Confirm password"
      required
    />
    <snt-button
      style="margin-top: 12px"
      :disabled="!$validate(form)"
      @click="$dispatch('AccountModule/register', form)"
      >Register</snt-button
    >
  </fieldset>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput, SntButton },
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
};
</script>

<style scoped lang="scss"></style>
