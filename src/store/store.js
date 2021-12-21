import { AccountModule } from "./modules/AccountModule";
import { ExampleResourceModule } from "./modules/ExampleResourceModule";
import { Toast } from "./modules/Toast";
import { UserModule } from "./modules/UserModule";
import { createVuexStore } from "./store.factory";

export const store = createVuexStore({
  modules: {
    AccountModule,
    UserModule,
    Toast,
    ExampleResourceModule,
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
