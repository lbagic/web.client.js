<template>
  <fieldset class="snt-container-s my-auto">
    <input v-model="form.email" type="email" name="email" placeholder="Email" />
    <input
      v-model="form.password"
      type="password"
      name="password"
      placeholder="Password"
    />
    <button
      class="primary w-1-1"
      style="color: var(--snt-color-light); margin-top: 8px"
      @click="$store.dispatch('AccountModule/login', form)"
    >
      Login
    </button>
    <router-link
      to="/forgot-password"
      class="snt-animate-underline justify-self"
      >Forgot password?</router-link
    >
  </fieldset>
</template>

<script>
export default {
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
      this.$store.commit("AccountModule/setRecoverEmail", value);
    },
  },
};
</script>

<style scoped lang="scss"></style>
