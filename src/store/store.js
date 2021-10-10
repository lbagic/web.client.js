import { AccountModule } from "./modules/AccountModule";
import { UserModule } from "./modules/UserModule";
import { createVuexStore } from "./store.factory";

export const store = createVuexStore({
  modules: {
    AccountModule,
    UserModule,
  },
  persist: {
    AccountModule,
    UserModule,
  },
  actions: {
    onOpen() {},
    onClose() {},
    onLogin() {},
    onLogout() {},
  },
});
