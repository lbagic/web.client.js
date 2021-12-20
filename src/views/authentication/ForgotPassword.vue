<template>
  <fieldset
    class="snt-container-s m-auto snt-grid snt-card"
    style="--gap: 12px"
  >
    <legend class="snt-fs-2" style="color: var(--snt-color-primary-darker)">
      Forgot password?
    </legend>
    <snt-input
      :model="{ email: form }"
      type="email"
      name="email"
      label="Email"
      required
    />
    <snt-button
      style="margin-top: 12px"
      :disabled="!$validate(form)"
      @click="
        $store
          .dispatch('AccountModule/recoverPassword')
          .then(() => $router.push('/reset-password'))
      "
      >Recover password</snt-button
    >
    <snt-button to="/reset-password" type="text"
      >Got recovery token?</snt-button
    >
  </fieldset>
</template>

<script>
import SntButton from "../../components/utils/SntButton.vue";
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput, SntButton },
  name: "Forgot Password",
  data() {
    return {
      form: { email: this.$store.state.AccountModule.recoveryEmail },
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
