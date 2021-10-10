import { router } from "../../router/router";
import { AccountService } from "../../services/AccountService";

export const AccountModule = {
  state: () => ({
    token: undefined,
    recoverEmail: "",
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
  },
  actions: {
    login({ commit, dispatch }, payload) {
      const promise = AccountService.login(payload);
      promise.then(({ payload }) => {
        commit("setToken", payload.token);
        commit("UserModule/setUser", payload.user, { root: true });
        dispatch("onLogin", undefined, { root: true });
        router.push("/services");
      });
      return promise;
    },
    logout({ commit, dispatch }) {
      commit("clearState", undefined, { root: true });
      dispatch("onLogout", undefined, { root: true });
      router.push("/login");
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
