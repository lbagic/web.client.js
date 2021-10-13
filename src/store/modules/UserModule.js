export const UserModule = {
  state: () => ({ user: undefined }),
  getters: {
    userId: (s) => s.user.id,
  },
};
