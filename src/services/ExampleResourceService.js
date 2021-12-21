import { createServiceCrud } from "../utils/crud";
import { Api } from "./base/Api";

export const ExampleResourceService = {
  ...createServiceCrud(Api.snt, "/resource"),
};
