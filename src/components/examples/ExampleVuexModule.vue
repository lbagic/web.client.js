<template>
  <div style="display: grid; gap: 0.5rem">
    <pre style="background-color: #f002">
export const ExampleModule = { 
  state: () => ({
    items: [],
  })
};</pre
    >
    <pre>Generated Getters: {{ this.getters }}</pre>
    <pre>Generated Mutations: {{ this.mutations }}</pre>

    <pre style="background-color: #f002">
state.items = {{ $state.ExampleModule.items }}</pre
    >
    <input v-model="itemsToSet" type="text" />
    <button @click="$commit('ExampleModule/setItems', JSON.parse(itemsToSet))">
      $commit('ExampleModule/setItems', items)
    </button>
    <br />

    <input v-model="itemsToAdd" type="text" />
    <button @click="$commit('ExampleModule/addItems', JSON.parse(itemsToAdd))">
      $commit('ExampleModule/addItems', items)
    </button>
    <button @click="$commit('ExampleModule/pushItems', JSON.parse(itemsToAdd))">
      $commit('ExampleModule/pushItems', items)
    </button>
    <br />

    <input v-model="itemsToRemove" type="text" />
    <button
      @click="$commit('ExampleModule/removeItems', JSON.parse(itemsToRemove))"
    >
      $commit('ExampleModule/removeItems', itemId)
    </button>
    <br />

    <button @click="$commit('ExampleModule/clearItems')">
      $commit('ExampleModule/clearItems')
    </button>
    <button @click="$commit('ExampleModule/clearState')">
      $commit('ExampleModule/clearState')
    </button>
  </div>
</template>

<script>
export default {
  name: "ExampleVuexModule",
  mounted() {
    const { _mutations, getters } = this.$store;
    this.mutations = Object.keys(_mutations).filter((key) =>
      key.includes("ExampleModule")
    );
    this.getters = Object.keys(getters).filter((key) =>
      key.includes("ExampleModule")
    );
  },
  data() {
    return {
      mutations: [],
      getters: [],
      itemsToSet:
        '[{ "id": 1, "name": "Lorem" }, { "id": 2, "name": "Ipsum" }, { "id": 3, "name": "Dolor"}]',
      itemsToAdd: '{ "id": 1, "name": "AA" }',
      itemsToRemove: "[1, 2, 3]",
    };
  },
};
</script>

<style scoped lang="scss">
.example-vuex-inputs {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  & > * {
    padding: 0.5rem;
  }
  & > button {
    background: var(--snt-color-primary);
    color: white;
  }
}
input,
button {
  padding: 1rem;
}
input {
  background: var(--snt-color-primary-lightest);
}
button {
  background: var(--snt-color-primary);
  color: white;
}
</style>
