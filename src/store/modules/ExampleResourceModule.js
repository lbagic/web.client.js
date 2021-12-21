import { ExampleResourceService } from "../../services/ExampleResourceService";
import { createModuleCrud } from "../../utils/crud";

export const ExampleResourceModule = {
  state: () => ({
    items: [],
  }),
  actions: {
    ...createModuleCrud(ExampleResourceService, "items"),
  },
};
