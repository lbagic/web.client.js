import { createServiceCrud } from "../utils/crud";
import { Api } from "./base/Api";

export const ItemService = {
  ...createServiceCrud(Api.snt, "/items"),
};
