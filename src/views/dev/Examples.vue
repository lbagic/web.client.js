<template>
  <div class="examples">
    <aside>
      <router-link to="/examples/snt-button">snt-button</router-link>
      <router-link to="/examples/snt-icon">snt-icon</router-link>
      <router-link to="/examples/snt-modal">snt-modal</router-link>
      <router-link to="/examples/snt-overlay">snt-overlay</router-link>
      <router-link to="/examples/snt-toast">snt-toast</router-link>
      <router-link to="/examples/snt-input">snt-input</router-link>
    </aside>
    <section class="snt-container example-wrap">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: "Examples",
};
</script>

<style scoped lang="scss">
.examples {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}
aside {
  display: grid;
  align-content: flex-start;
  background: var(--snt-color-primary);
  > * {
    color: white;
    padding: 0.5rem 1rem;
    width: 100%;
  }
  & .router-link-exact-active {
    background: var(--snt-color-primary-lighter);
  }
}
</style>
