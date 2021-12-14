<template>
  <div class="snt-dev-popup">
    <router-link to="/dev/test">&#9876; Test</router-link>
    <router-link to="/dev/docs">&#9874; Docs</router-link>
  </div>
</template>

<script>
export default {
  name: "DevPopup",
};
</script>

<style scoped lang="scss">
.snt-dev-popup {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  & > * {
    padding: 4px 8px;
    color: white;
    opacity: 0.5;
    background: #111d;
    &:hover {
      opacity: 0.7;
    }
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
  }
}
</style>
