import { store } from "../../store/store";
import { createApi } from "./Api.factory";

export const Api = {
  snt: createApi({
    baseURL: process.env.VUE_APP_SNT_REST_API_URL,
    getToken: () => store?.state?.AccountModule?.token,
    responseHandler: (response) => ({
      msg: response?.data?.response?.msg,
      payload: response?.data?.response?.payload,
      status: response?.status,
      meta: response,
    }),
    errorHandler: (error) => {
      if (error.response?.status === 401)
        store.dispatch("AccountModule/logout");
      throw {
        msg: error.response?.data?.error?.display?.msg || "Api error",
        apiErrors: error.response?.data?.error?.api_errors,
        debug: error.response?.data?.error?.debug,
        status: error.response?.status,
        meta: error.response,
      };
    },
  }),
  axios: createApi({ baseUrl: "" }),
};
