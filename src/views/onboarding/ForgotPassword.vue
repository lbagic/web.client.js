<template>
  <fieldset class="container-s my-auto">
    <label>
      <input v-model="email" type="email" name="email" placeholder="Email" />
    </label>
    <button
      class="primary fw"
      style="color: var(--color-light); margin-top: 8px"
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
    <router-link to="/reset-password" class="animate-underline"
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
