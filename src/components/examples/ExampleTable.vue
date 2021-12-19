<template>
  <table class="snt-table">
    <tr v-for="row in 50" :key="row">
      <component :is="row === 1 ? 'th' : 'td'" v-for="col in 5" :key="col"
        >[row-{{ row }}, col-{{ col }}]</component
      >
    </tr>
  </table>
</template>

<script>
export default {
  name: "ExampleTable",
};
</script>

<style scoped lang="scss"></style>
