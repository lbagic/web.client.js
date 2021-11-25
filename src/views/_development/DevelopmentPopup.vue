<template>
  <transition name="snt-fade" appear class="snt-dev-popup">
    <slot>
      <router-link
        v-if="!$route.path.includes('/development')"
        to="/development"
        >&#9872; development</router-link
      >
    </slot>
  </transition>
</template>

<script setup></script>

<style scoped lang="scss">
.snt-dev-popup {
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  padding: 4px 8px;
  background: #111d;
  color: white;
  cursor: pointer;
}
</style>
