<template>
  <fieldset
    class="snt-container-s my-auto snt-grid snt-card"
    style="--gap: 12px"
  >
    <legend class="snt-fs-2" style="color: var(--snt-color-primary-darker)">
      Login
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
    <snt-button
      style="margin-top: 12px"
      :disabled="!$validate(form)"
      @click="$dispatch('AccountModule/emailLogin', form)"
      >Login</snt-button
    >
    <snt-button
      to="/forgot-password"
      class="snt-animate-underline justify-self"
      type="text"
      >Forgot password?</snt-button
    >
  </fieldset>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput, SntButton },
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  watch: {
    "form.email"(value) {
      this.$store.commit("AccountModule/setRecoveryEmail", value);
    },
  },
};
</script>

<style scoped lang="scss"></style>
