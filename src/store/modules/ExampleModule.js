export const ExampleModule = {
  // State must be defined as a function.
  state: () => ({
    items: [],
  }),

  // The following mutations and getters are generated automatically based on state:
  // getters: {
  //   getItems: state => state.items
  // }
  // mutations: {
  //   clearState: state => {... clears whole state to its initial value}
  //   setItems: (state, data) => (state.items = data),
  //   clearItems: (state) => (state.items = []),
  //   The following are generated only for arrays:
  //   addItems: (state, itemOrItems) => {...adds item or items to array; replaces if item with same id exists}
  //   removeItems: (state, itemOrItemsOrIdOrIds) => {...removes items from array}
  // },
};
