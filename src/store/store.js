import { AccountModule } from "./modules/AccountModule";
import { ExampleModule } from "./modules/ExampleModule";
import { Toast } from "./modules/Toast";
import { UserModule } from "./modules/UserModule";
import { createVuexStore } from "./store.factory";

const modules = {
  AccountModule,
  UserModule,
  Toast,
};

const persist = {
  AccountModule,
  UserModule,
};

if (process.env.NODE_ENV === "development")
  modules.ExampleModule = ExampleModule;

export const store = createVuexStore({
  modules,
  persist,
  actions: {
    onOpen() {},
    onClose() {},
    onLogin() {},
    onLogout() {},
  },
});
