<template>
  <div style="display: grid; gap: 0.5rem">
    <p>Example Store Module:</p>
    <pre class="pre-block" style="font-size: 12px; line-height: 1">
export const ExampleResourceModule = { 
  state: () => ({
    <span style="font-weight: bold; color: black">items: {{ $state.ExampleResourceModule.items }}</span>,
  })
};</pre>
    <p style="font-size: 12px">Generated getters: <i>getItems, findItems</i></p>
    <p style="font-size: 12px">
      Generated mutations:
      <i>setItems, clearItems, addItems, removeItems, pushItems, clearState</i>
    </p>

    <br />
    <p>Playground:</p>

    <input v-model="itemsToSet" type="text" />
    <button
      @click="$commit('ExampleResourceModule/setItems', JSON.parse(itemsToSet))"
    >
      $commit('ExampleResourceModule/<span>setItems</span>', item | item[])
    </button>
    <br />

    <input v-model="itemsToAdd" type="text" />
    <button
      @click="$commit('ExampleResourceModule/addItems', JSON.parse(itemsToAdd))"
    >
      $commit('ExampleResourceModule/<span>addItems</span>', item | item[])
    </button>
    <button
      @click="
        $commit('ExampleResourceModule/pushItems', JSON.parse(itemsToAdd))
      "
    >
      $commit('ExampleResourceModule/<span>pushItems</span>', item | item[])
    </button>
    <br />

    <input v-model="itemsToRemove" type="text" />
    <button
      @click="
        $commit('ExampleResourceModule/removeItems', JSON.parse(itemsToRemove))
      "
    >
      $commit('ExampleResourceModule/<span>removeItems</span>', id | id[] | item
      | item[])
    </button>
    <br />

    <button @click="$commit('ExampleResourceModule/clearItems')">
      $commit('ExampleResourceModule/<span>clearItems</span>')
    </button>
    <button @click="$commit('ExampleResourceModule/clearState')">
      $commit('ExampleResourceModule/<span>clearState</span>')
    </button>
  </div>
</template>

<script>
export default {
  name: "ExampleVuexModule",
  mounted() {
    const { _mutations, getters } = this.$store;
    this.mutations = Object.keys(_mutations).filter((key) =>
      key.includes("ExampleResourceModule")
    );
    this.getters = Object.keys(getters).filter((key) =>
      key.includes("ExampleResourceModule")
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
  color: var(--snt-color-primary-lightest);
  & > span {
    color: white;
    font-weight: bold;
  }
}
.pre-block {
  padding: 0.5rem;
  border-radius: 5px;
  background: #0001;
  color: #0008;
}
i {
  font-weight: bold;
}
</style>
