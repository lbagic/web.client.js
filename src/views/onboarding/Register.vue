<template>
  <fieldset class="container-s my-auto">
    <input type="email" v-model="form.email" name="email" placeholder="Email" />
    <input
      type="password"
      v-model="form.password"
      name="password"
      placeholder="Password"
    />
    <input
      type="password"
      v-model="form.password_confirmation"
      name="password"
      placeholder="Confirm password"
    />
    <button
      class="primary fw"
      style="color: var(--color-light); margin-top: 8px"
      @click="$store.dispatch('AccountModule/register', form)"
    >
      Register
    </button>
  </fieldset>
</template>

<script>
export default {
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
