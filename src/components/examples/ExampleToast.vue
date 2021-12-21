<template>
  <button
    style="background: var(--snt-color-success-lightest)"
    @click="$dispatch('Toast/success', 'success')"
  >
    $dispatch('Toast/success', 'success')
  </button>
  <button
    style="background: var(--snt-color-error-lightest)"
    @click="$dispatch('Toast/error', 'error')"
  >
    $dispatch('Toast/error', 'error')
  </button>
  <button
    style="background: #0002"
    @click="$dispatch('Toast/notification', 'notification')"
  >
    $dispatch('Toast/notification', 'notification')
  </button>
</template>

<script>
export default {
  name: "ExampleToast",
};
</script>

<style scoped lang="scss">
button {
  display: block;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
