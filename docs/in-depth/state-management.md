# State Management with Vuex Store

Vuex is a state management solution built for Vue.js. It provides a way to store state which can then be accessed from any part of the application.

> This page does not cover the basics for using Vuex, if you want to read up more about it, visit [the official documentation page](https://vuex.vuejs.org/).

#### Vuex Structure

The basic building blocks of a Vuex store (and store modules) are the following: `state`, `getters`, `mutations`, `actions`.

`State` holds the data;<br>`Getters` are computed properties that are calculated based on state;<br>`Mutations` provide an interface for changing the state;<br>and `Actions` which contain the business logic, make service calls and invoke mutations.

#### Vuex Modules

The vuex store can be divided into modules - where each module should contain data that's semantically similar.

> A "UserModule" would include all data and methods related to user, and<br>an "AuthModule" would include all data and methods related to users Authentication.

## Creating Vuex Store And Modules

#### Creating Store Instance

The following is an example of a base setup for the Vuex Store:<br>

```js
export const store = createVuexStore({
  modules: {
    AccountModule,
    UserModule,
    Toast,
  },
  persist: {
    AccountModule,
    UserModule,
  },
});
```

> `modules` represent registered store modules and<br>`persist` tags modules for persisted storage (localStorage by default).
>
> Other properties that it can accept are `state`, `getters`, `mutations`, `actions` and `plugins`.

#### Creating a Module

The same syntax and properties for creating the Store Instance apply to creating a Module as well.<br>
Example of creating a module:

```js
export const AccountModule = {
  state: () => ({
    token: undefined,
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
  },
  mutations: {
    setToken: (state, payload) => (state.token = payload),
  },
  actions: {
    login(ctx, payload) {
      const promise = AccountService.login(payload);
      promise.then((res) => commit("setToken", res.payload.token));
      return promise;
    },
  },
};
```

::: warning
`state` should always be defined as a function (similar to data property in vue components).
:::

## Auto-generated Store Methods

To avoid writing boilerplate code, Vuex Store is set up in a way that it will automatically create generic **mutations** and **getters** based on defined `state`.

Here is the list of auto generated methods based on this ExampleModule:

```js
export const ExampleModule = {
  state: () => ({
    item: undefined,
  }),
};
```

| method              | parameters                   | generated for | description             |
| ------------------- | ---------------------------- | ------------- | ----------------------- |
| mutation.clearState |                              | module        | clears module state     |
| mutation.clearItem  |                              | item          | clears item state       |
| mutation.setItem    | payload                      | item          | item setter             |
| getter.getItem      |                              | item          | item getter             |
| mutation.addItem    | item \| item[]               | item[]        | adds or updates item(s) |
| mutation.removeItem | item \| item[] \| id \| id[] | item[]        | removes item(s)         |
| mutation.pushItem   | item \| item[]               | item[]        | pushes item(s)          |
| getter.findItem     | id                           | item[]        | finds item by id        |

> To generate array getters and mutations you need to assign an array as initial item state<br>e.g. `state: () => ({ item: [] })`

## How To Use Store

#### Using store within components (directly)

```html
<template>
  <button @click="$commit('setItem', 'payload')">
    {{ $state.ExampleModule.item }}
  </button>
  <button @click="$dispatch('itemAction', 'payload')">
    {{ $getter['ExampleModule/item'] }}
  </button>
</template>
<script>
  export default {
    methods: {
      accessingStoreDirectly() {
        this.$state.ExampleModule.item;
        this.$getters["ExampleModule/item"];
        this.$commit("ExampleModule/setItem", "payload");
        this.$dispatch("ExampleModule/itemAction", "payload");
      },
    },
  };
</script>
```

#### Using store within components (via mapped elements)

```html
<template>
  <button @click="setItem('payload')">{{ item }}</button>
  <button @click="itemAction('payload')">{{ getItem }}</button>
</template>
<script>
  export default {
    methods: {
      accessingStoreViaMappedElements() {
        this.item
        this.getItem
        this.setItem('payload')
        this.itemAction('payload')
      }
    }
    computed: {
      // mapping mutations, getters, state & actions to the component
      ...mapState('ExampleModule', ['item'])
      ...mapGetters('ExampleModule', ['getItem'])
      ...mapMutations('ExampleModule', ['setItem'])
      ...mapActions('ExampleModule', ['itemAction'])
    }
  }
</script>
```
