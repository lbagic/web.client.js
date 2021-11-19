<template>
  <fieldset class="snt-container-s my-auto">
    <label>
      <input v-model="email" type="email" name="email" placeholder="Email" />
    </label>
    <button
      class="primary w-1-1"
      style="color: var(--snt-color-light); margin-top: 8px"
      @click="
        $store
          .dispatch('AccountModule/recoverPassword', {
            email: $store.state.AccountModule.recoverEmail,
          })
          .then(() => $router.push('/reset-password'))
      "
    >
      Recover password
    </button>
    <router-link to="/reset-password" class="snt-animate-underline justify-self"
      >Got recovery token?</router-link
    >
  </fieldset>
</template>

<script>
export default {
  name: "Forgot Password",
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
