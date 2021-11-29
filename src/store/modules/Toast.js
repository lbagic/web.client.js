const createMessage = ({ message, type, error }) => ({
  id: Date.now(),
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
