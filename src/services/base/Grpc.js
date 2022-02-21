import { store } from "../../store/store";
import { createGrpc } from "./Grpc.factory";

export const Grpc = {
  snt: createGrpc({
    hostname: process.env.VUE_APP_SNT_GRPC_URL,
    getToken: () => store?.state?.AccountModule?.token,
  }),
};

export function hydrateGrpcModel(model, data) {
  const dataKeys = Object.keys(data);
  const modelObject = model.toObject();

  dataKeys.forEach((key) => {
    if (modelObject[key] === undefined) return;
    const setter = "set" + key.charAt(0).toUpperCase() + key.slice(1);
    model[setter](data[key]);
  });

  return model;
}
