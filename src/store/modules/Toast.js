import { store } from "../store";

let id = 1;
const createMessage = ({ message, type, error }) => ({
  id: id++,
  message,
  type,
  error: !!error,
});

export const Toast = {
  state: () => ({
    toasts: [],
  }),
  actions: {
    success(ctx, message) {
      const item = createMessage({ message, type: "toast" });
      setTimeout(() => ctx.commit("removeToasts", item.id), 3000);
      ctx.commit("addToasts", item);
    },
    error(ctx, message) {
      const item = createMessage({ message, type: "toast", error: true });
      setTimeout(() => ctx.commit("removeToasts", item.id), 3000);
      ctx.commit("addToasts", item);
    },
    notification(ctx, message) {
      const item = createMessage({ message, type: "notification" });
      ctx.commit("addToasts", item);
    },
  },
};

export const toast = {
  success: (message) => store.dispatch("Toast/success", message),
  error: (message) => store.dispatch("Toast/error", message),
  notification: (message) => store.dispatch("Toast/notification", message),
};
