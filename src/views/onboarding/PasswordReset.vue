<template>
  <fieldset
    class="snt-container-s my-auto snt-grid snt-card"
    style="--gap: 12px"
  >
    <legend class="snt-fs-2" style="color: var(--snt-color-primary-darker)">
      Reset password
    </legend>
    <snt-input
      :model="{ email: form }"
      type="email"
      name="email"
      label="Email"
    />
    <snt-input
      :model="{ recovery_token: form }"
      type="text"
      name="recovery-token"
      label="Recovery token"
    />
    <snt-input
      :model="{ password: form }"
      type="password"
      name="password"
      label="New password"
    />
    <snt-button
      style="margin-top: 12px"
      @click="
        $store
          .dispatch('AccountModule/resetPassword', form)
          .then(() => $router.push('/login'))
      "
    >
      Reset password
    </snt-button>
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
      form: {
        email: this.$store.state.AccountModule.recoveryEmail,
        recovery_token: "",
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
