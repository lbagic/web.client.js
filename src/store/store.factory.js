import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

export const createVuexStore = (
  module = {
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
    persist: {},
    plugins: [],
  }
) => {
  const customStore = createVuexModule(module, {
    root: true,
    name: "store.js",
  });
  return createStore(customStore);
};

const createVuexModule = (module, options = {}) => {
  const output = {};
  if (process.env.NODE_ENV !== "production") output.strict = true;
  if (!options.root) output.namespaced = true;
  if (module.state) {
    if (typeof module.state !== "function")
      throw new Error(
        `Store state should be defined as a function (just like in vue components). Error found in ${options.name}.`
      );
    output.state = module.state;
  }
  if (module.mutations) output.mutations = module.mutations;
  if (module.getters) output.getters = module.getters;
  if (module.actions) output.actions = module.actions;
  if (module.plugins) output.plugins = module.plugins;
  if (module.persist) output.persist = module.persist;
  if (module.modules) output.modules = module.modules;

  if (output.modules)
    output.modules = Object.fromEntries(
      Object.entries(output.modules).map(([key, value]) => {
        return [key, createVuexModule(value, { name: key })];
      })
    );

  generateModuleFunctions(output, { root: true });

  if (output.persist) {
    const persistModules = Object.keys(output.persist);
    if (persistModules.length) {
      if (!output.plugins) output.plugins = [];
      const vuexPersist = new VuexPersist({
        storage: window.localStorage,
        reducer: (state) =>
          persistModules.reduce((a, moduleName) => {
            a[moduleName] = state[moduleName];
            return a;
          }, {}),
      });
      output.plugins.push(vuexPersist.plugin);
    }
  }

  return output;
};

const generateModuleFunctions = (
  module,
  options = {
    root: false,
    currentState: undefined,
    currentPath: [],
  }
) => {
  if (options.root) {
    const stateTree = generateStateTree(module);
    if (!isEmpty(stateTree)) {
      if (!module.mutations) module.mutations = {};
      // mutation.clearState
      module.mutations["clearState"] = (s) => clearState(stateTree, s);
    }
  }

  if (!module.state) return;
  if (!module.mutations) module.mutations = {};
  if (!module.getters) module.getters = {};
  const state = options?.currentState ?? module.state();
  const mutations = {};
  const getters = {};
  const currentPath = options?.currentPath ?? [];

  Object.entries(state).forEach(([key, value]) => {
    const path = [...currentPath, key];
    const parentPointer = pointer(currentPath);
    const valuePointer = pointer(path);
    const pathName = path.map((x) => capitalize(x)).join("");

    // mutations.setItem
    mutations[`set${pathName}`] = (s, data) => (parentPointer(s)[key] = data);

    // mutations.clearItem
    mutations[`clear${pathName}`] = (s) => (s[key] = value);

    // getters.getItem
    getters[`get${pathName}`] = (s) => valuePointer(s);

    if (isPlainObject(value))
      generateModuleFunctions(module, {
        currentState: value,
        currentPath: path,
      });
    else if (Array.isArray(value)) {
      // getters.findItem
      getters[`find${pathName}`] = (state) => (id) =>
        valuePointer(state).find((el) => el.id === id);

      // mutations.addItem
      mutations[`add${pathName}`] = (state, items) => {
        const _items = Array.isArray(items) ? items : [items];
        const _array = valuePointer(state);
        _items.forEach((item) => {
          const isObject = item.id !== undefined;
          const newObject = isObject ? { ...item } : item;
          let foundIndex = undefined;
          _array.some((entity, entityIndex) => {
            const isFound = isObject ? entity.id === item.id : entity === item;
            if (isFound) foundIndex = entityIndex;
          });
          if (foundIndex === undefined) _array.push(newObject);
          else _array[foundIndex] = newObject;
        });
      };

      // mutations.removeItem
      mutations[`remove${pathName}`] = (state, items) => {
        const _items = Array.isArray(items) ? items : [items];
        const _array = valuePointer(state);
        _items.forEach((item) => {
          const id = item.id === undefined ? item : item.id;
          let foundIndex = undefined;
          _array.some((entity, entityIndex) => {
            const isFound = entity.id === id || entity === id;
            if (isFound) foundIndex = entityIndex;
          });
          if (foundIndex !== undefined) _array.splice(foundIndex, 1);
        });
      };

      // mutations.pushItem
      mutations[`push${pathName}`] = (state, items) => {
        const _array = valuePointer(state);
        const _items = Array.isArray(items) ? items : [items];
        _array.push(..._items);
      };
    }
  });

  module.mutations = { ...mutations, ...module.mutations };
  module.getters = { ...getters, ...module.getters };
};

// Utility functions

const isEmpty = (obj) =>
  !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
const isPlainObject = (obj) =>
  typeof obj === "object" &&
  obj !== null &&
  obj.constructor === Object &&
  Object.prototype.toString.call(obj) === "[object Object]";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const pointer = (path) => (state) => path.reduce((a, c) => a[c], state);

const generateStateTree = (module) => {
  const tree = {};
  Object.entries(module.modules || {}).forEach(([key, value]) => {
    const subTree = generateStateTree(value);
    if (!isEmpty(subTree)) Object.assign(tree, { [key]: subTree });
  });
  if (module.state) Object.assign(tree, module.state());
  if (!isEmpty(tree)) return tree;
};

const clearState = (stateTree, state) => {
  Object.entries(stateTree).forEach(([key, refValue]) => {
    if (isPlainObject(refValue)) clearState(refValue, state[key]);
    else state[key] = refValue;
  });
};
