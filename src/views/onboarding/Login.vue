<template>
  <fieldset class="container-s my-auto">
    <input type="email" v-model="form.email" name="email" placeholder="Email" />
    <input
      type="password"
      v-model="form.password"
      name="password"
      placeholder="Password"
    />
    <button
      class="primary fw"
      style="color: var(--color-light); margin-top: 8px"
      @click="$store.dispatch('AccountModule/login', form)"
    >
      Login
    </button>
    <router-link to="/forgot-password" class="animate-underline"
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
