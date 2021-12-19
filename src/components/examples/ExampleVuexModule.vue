<template>
  <div style="display: grid; gap: 0.5rem">
    <p>Example Store Module:</p>
    <pre class="pre-block">
export const ExampleModule = { 
  state: () => ({
    items: [],
  })
};</pre
    >
    <div class="pre-block">
      <pre>Generated Getters: {{ this.getters }}</pre>
      <pre>Generated Mutations: {{ this.mutations }}</pre>
    </div>

    <p>Module State:</p>
    <pre class="pre-block">state.items = {{ $state.ExampleModule.items }}</pre>

    <p>Store functions:</p>

    <input v-model="itemsToSet" type="text" />
    <button @click="$commit('ExampleModule/setItems', JSON.parse(itemsToSet))">
      $commit('ExampleModule/<strong>setItems</strong>', item | item[])
    </button>
    <br />

    <input v-model="itemsToAdd" type="text" />
    <button @click="$commit('ExampleModule/addItems', JSON.parse(itemsToAdd))">
      $commit('ExampleModule/<strong>addItems</strong>', item | item[])
    </button>
    <button @click="$commit('ExampleModule/pushItems', JSON.parse(itemsToAdd))">
      $commit('ExampleModule/<strong>pushItems</strong>', item | item[])
    </button>
    <br />

    <input v-model="itemsToRemove" type="text" />
    <button
      @click="$commit('ExampleModule/removeItems', JSON.parse(itemsToRemove))"
    >
      $commit('ExampleModule/<strong>removeItems</strong>', id | id[] | item |
      item[])
    </button>
    <br />

    <button @click="$commit('ExampleModule/clearItems')">
      $commit('ExampleModule/<strong>clearItems</strong>')
    </button>
    <button @click="$commit('ExampleModule/clearState')">
      $commit('ExampleModule/<strong>clearState</strong>')
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
.pre-block {
  padding: 0.5rem;
  border-radius: 5px;
  background: #0001;
}
</style>
