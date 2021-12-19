<template>
  <button @click="$dispatch('Toast/success', 'success')">
    $dispatch('Toast/success', 'success')
  </button>
  <button @click="$dispatch('Toast/error', 'error')">
    $dispatch('Toast/error', 'error')
  </button>
  <button @click="$dispatch('Toast/notification', 'notification')">
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
}
</style>
