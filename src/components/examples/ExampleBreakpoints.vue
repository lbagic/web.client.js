<template>
  <div class="breakpoint-grid">
    <p>$bp.actie:</p>
    <p style="color: black">{{ $bp.size }}</p>
    <p>$bp.s:</p>
    <p :data-active="$bp.s">{{ $bp.s }}</p>
    <p>$bp.m:</p>
    <p :data-active="$bp.m">{{ $bp.m }}</p>
    <p>$bp.l:</p>
    <p :data-active="$bp.l">{{ $bp.l }}</p>
    <p>$bp.xl:</p>
    <p :data-active="$bp.xl">{{ $bp.xl }}</p>
  </div>
</template>

<script>
export default {
  name: "ExampleBreakpoints",
};
</script>

<style scoped lang="scss">
.breakpoint-grid {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  gap: 0.2rem;
  & > * {
    padding: 0.3rem 0.5rem;
  }
  & > *:nth-child(2n) {
    background: #0001;
    font-weight: bold;
    border-radius: 5px;
    color: #0005;
  }
  & > *[data-active="true"] {
    color: black;
  }
}
</style>
