import axios from "axios";
import { aop } from "../../utils/aop";

/**
 * Create api instance.
 *
 * @param {{
 *  baseUrl: String,
 *  requestHandler?: (config: import("axios").AxiosRequestConfig<any>) => import("axios").AxiosRequestConfig<any>,
 *  responseHandler?: (value: import("axios").AxiosResponse<never>) => import("axios").AxiosResponse<never>,
 *  errorHandler?: (error: any) => any
 *  getToken?: () => String
 * }} config Configuration object for api instance.
 * @return {import("axios").AxiosInstance} Return Api instance.
 */

export const createApi = (config) => {
  const { requestHandler, responseHandler, errorHandler, getToken } = config;
  delete config.requestHandler;
  delete config.responseHandler;
  delete config.errorHandler;
  delete config.getToken;

  const instance = axios.create(config);

  // attach default logging interceptors
  if (process.env.NODE_ENV !== "production")
    instance.interceptors.response.use((res) => {
      console.log(
        res.config.method.toUpperCase(),
        res.config.url,
        res.status,
        res.data
      );
      return res;
    });

  instance.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(responseHandler, errorHandler);

  // buffer identical calls
  const dedupePromiseMap = new Map();
  const dedupePromisesAspect = (fn, ...args) => {
    const token = getToken && getToken();
    // generate key based on call arguments and token
    const key = JSON.stringify({ args, config }) + (token ?? "");
    const identicalUnresolvedCall = dedupePromiseMap.get(key);
    // if identical call is already in progress, return its reference
    if (identicalUnresolvedCall) return identicalUnresolvedCall;
    // if no identical calls are in progress, call and return a new one
    else {
      const newCall = fn(...args);
      dedupePromiseMap.set(key, newCall);
      newCall.catch(() => {}).finally(() => dedupePromiseMap.delete(key));
      return newCall;
    }
  };

  aop.injectBeforeExecuting(instance, dedupePromisesAspect, [
    "get",
    "post",
    "put",
    "delete",
  ]);

  return instance;
};
