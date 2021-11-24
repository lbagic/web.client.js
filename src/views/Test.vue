<template>
  <div>
    <snt-input
      type="text"
      :options="[
        { value: 1, label: 'aaa' },
        { value: 22222222222222, label: 'bbb' },
      ]"
      required
      :validator="(val) => (val === '' ? 'KHM, REQUIRED!' : true)"
      error="Whaaat?"
      placeholder="Things"
      help="I am here to help"
    />
    <snt-icon icon="Google" />
  </div>
</template>

<script setup>
import SntIcon from "../components/utils/SntIcon.vue";
import SntInput from "../components/utils/SntInput.vue";
</script>
