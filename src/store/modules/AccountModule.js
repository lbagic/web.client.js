import { router } from "../../router/router";
import { AccountService } from "../../services/AccountService";

export const AccountModule = {
  state: () => ({
    token: undefined,
    recoverEmail: "",
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
    userType: (s, g) => (g.isLoggedIn ? "user" : "visitor"),
  },
  actions: {
    login({ commit, dispatch }, payload) {
      const promise = AccountService.login(payload);
      promise.then(({ payload }) => {
        commit("setToken", payload.token);
        commit("UserModule/setUser", payload.user, { root: true });
        dispatch("onLogin", undefined, { root: true });
        router.go();
      });
      return promise;
    },
    logout({ commit, dispatch }) {
      AccountService.logout()
        .catch()
        .finally(() => {
          commit("clearState", undefined, { root: true });
          dispatch("onLogout", undefined, { root: true });
          router.go();
        });
    },
    register(ctx, payload) {
      const promise = AccountService.register(payload);
      return promise;
    },
    recoverPassword(ctx, payload) {
      const promise = AccountService.recoverPassword(payload);
      return promise;
    },
    resetPassword(ctx, payload) {
      const promise = AccountService.resetPassword(payload);
      return promise;
    },
  },
};
