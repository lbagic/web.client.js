import { AccountModule } from "./modules/AccountModule";
import { Toast } from "./modules/Toast";
import { UserModule } from "./modules/UserModule";
import { createVuexStore } from "./store.factory";

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
  actions: {
    onOpen() {},
    onClose() {},
    onLogin() {},
    onLogout() {},
  },
});
