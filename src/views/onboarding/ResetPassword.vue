<template>
  <fieldset class="container-s my-auto">
    <input v-model="email" type="email" name="email" placeholder="Email" />
    <input
      v-model="form.recovery_token"
      type="text"
      name="token"
      placeholder="Recovery token"
    />
    <input
      v-model="form.password"
      type="password"
      name="password"
      placeholder="New password"
    />
    <button
      class="primary fw"
      style="color: var(--color-light); margin-top: 8px"
      @click="
        $store
          .dispatch('AccountModule/resetPassword', {
            ...form,
            email: $store.state.AccountModule.recoverEmail,
          })
          .then(() => $router.push('/login'))
      "
    >
      Reset password
    </button>
  </fieldset>
</template>

<script>
export default {
  name: "Forgot Password",
  data() {
    return {
      form: {
        recovery_token: "",
        password: "",
      },
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.AccountModule.recoverEmail;
      },
      set(value) {
        this.$store.commit("AccountModule/setRecoverEmail", value);
      },
    },
  },
};
</script>

<style scoped lang="scss"></style>
