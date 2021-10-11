import { createServiceCrud } from "../utils/crud";
import { Api } from "./base/Api";

export const ItemService = {
  // Scaffold crud calls for "/items" endpoint.
  ...createServiceCrud(Api.snt, "/items"),
};
// ServiceCrud generates the following methods:
// ItemService.get(id);
// ItemService.getAll();
// ItemService.create(data);
// ItemService.update(id, data);
// ItemService.delete(id);
