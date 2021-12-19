---
sidebarDepth: 3
---

# State Management with Vuex Store

Vuex is a state management solution built for Vue.js. It provides a way to store state which can then be accessed from any part of the application.

> This page does not cover the basics for using Vuex, if you want to read up more about it, visit [the official documentation page](https://vuex.vuejs.org/).

#### Vuex Structure

The basic building blocks of a Vuex store (and store modules) are the following: `state`, `getters`, `mutations`, `actions`.

`State` holds the data;<br>`Getters` are computed properties that are calculated based on state;<br>`Mutations` provide an interface for changing the state;<br>and `Actions` usually contain most of the business logic, make service calls, and invoke mutations.

#### Vuex Modules

The vuex store can be divided into modules - where each module should contain data that's semantically similar.

> E.g. a `UserModule` would include all data and methods related to user, and<br>an `AuthModule` would include all data and methods related to Authentication.

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
> Other properties that it can accept are `state`, `getters`, `mutations`, `actions`, and `plugins`.

#### Creating Module

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

To avoid writing boilerplate code, Vuex Store is configured to automatically generate **mutations** and **getters** based on defined `state`.

Here is the list of auto generated methods based on this ExampleModule:

```js
export const ExampleModule = {
  state: () => ({
    item: undefined,
  }),
};
```

| Method     | Parameters                   | Type     | Applies to  | Description             |
| ---------- | ---------------------------- | -------- | ----------- | ----------------------- |
| clearState |                              | mutation | all states  | clears module state     |
| clearItem  |                              | mutation | state       | clears item state       |
| setItem    | payload                      | mutation | state       | item setter             |
| getItem    |                              | getter   | state       | item getter             |
| addItem    | item \| item[]               | mutation | array state | adds or updates item(s) |
| removeItem | item \| item[] \| id \| id[] | mutation | array state | removes item(s)         |
| pushItem   | item \| item[]               | mutation | array state | pushes item(s)          |
| findItem   | id                           | getter   | array state | finds item by id        |

::: tip
To generate array getters and mutations, the initial state must be defined as an array.<br>E.g. `state: () => ({ items: [] })`
:::

---

The methods are generated for nested properties as well. Consider the following example.

#### This is what you write:

```js
export const ExampleModule = {
  state: () => ({
    user: {
      id: undefined,
    },
  }),
};
```

#### This is what you get:

```js
export const ExampleModule = {
  state: () => ({
    user: {
      id: undefined,
    },
  }),
  getters: {
    getUser: (state) => state.user,
    getUserId: (state) => state.user.id,
  },
  mutations: {
    clearState: ({ state }) => (state.user = { id: undefined }),
    clearUser: ({ state }) => (state.user = { id: undefined }),
    clearUserId: ({ state }) => (state.user.id = undefined),
    setUser: ({ state }, payload) => (state.user = payload),
    setUserId: ({ state }, payload) => (state.user.id = payload),
  },
};
```

## How To Use Store

Examples below show how to use the store inside of your components.<br>More options documented at the [official vuex website](https://vuex.vuejs.org/).

| Description         | Syntax                           |
| ------------------- | -------------------------------- |
| Accessing state     | $store.state.Module.item         |
| Accessing getters   | $store.getters['Module/getter']  |
| Commiting mutations | $store.commit('Module/mutation') |
| Dispatching actions | $store.dispatch('Module/action') |

::: tip
To save a few keystrokes, the framework provides the following shorthand properties:<br>`$state`, `$getters`, `$commit`, and `$dispatch`.
:::

### Mapping store properties to the component

Vuex provides a way to map the store properties directly to the component.

```html
<template>
  <p>Item state: {{item}}</p>
  <p>Item state via getter: {{getItem}}</p>
  <button @click="setItem('payload')">commit mutation</button>
  <button @click="itemAction('payload')">dispatch action</button>
</template>
<script>
  export default {
    computed: {
      // mapping state, getters, mutations, and actions to the component
      ...mapState('ModuleName', ['item'])
      ...mapGetters('ModuleName', ['getItem'])
      ...mapMutations('ModuleName', ['setItem'])
      ...mapActions('ModuleName', ['itemAction'])
    }
  }
</script>
```

#### Live Example:

http://localhost:8080/examples/vuex-store
