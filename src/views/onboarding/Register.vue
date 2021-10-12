<template>
  <fieldset class="container-s my-auto">
    <input v-model="form.email" type="email" name="email" placeholder="Email" />
    <input
      v-model="form.password"
      type="password"
      name="password"
      placeholder="Password"
    />
    <input
      v-model="form.password_confirmation"
      type="password"
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
