import { ItemService } from "../../services/_ItemService.example";
import { createModuleCrud } from "../../utils/crud";

export const ItemModule = {
  state: () => ({
    items: [],
  }),
  actions: {
    ...createModuleCrud(ItemService, "/items"),
  },
};
