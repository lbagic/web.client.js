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

<style scoped lang="scss">
.snt-dev-popup {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  padding: 4px 8px;
  background: #111d;
  color: white;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
}
</style>
