import axios from "axios";
import { aop } from "../../utils/aop";

export const createApi = (
  config = {
    baseUrl: "",
    requestHandler: (request) => request,
    responseHandler: (response) => response,
    errorHandler: (error) => {
      throw error;
    },
    getToken: () => undefined,
  }
) => {
  const { requestHandler, responseHandler, errorHandler, getToken } = config;
  delete config.requestHandler;
  delete config.responseHandler;
  delete config.errorHandler;
  delete config.getToken;

  const instance = axios.create(config);

  const calls = {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
  };

  instance.interceptors.request.use((res) => {
    if (!res.baseURL)
      console.error(
        `Api error: baseUrl is not set! Your calls are bound to fail. ${res.method.toUpperCase()} ${
          res.url
        }`
      );
    return res;
  });

  instance.interceptors.response.use(
    (res) => {
      const { method, url, baseURL } = res.config;
      console.log(method.toUpperCase(), baseURL + url, res.status, res);
      return res;
    },
    (err) => {
      console.warn(err);
      throw err;
    }
  );

  // attach interceptors
  if (requestHandler || getToken)
    instance.interceptors.request.use(
      (config) => {
        const token = getToken && getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (requestHandler) requestHandler(config);
        return config;
      },
      () => {}
    );
  if (responseHandler || errorHandler)
    instance.interceptors.response.use(
      responseHandler ? responseHandler : (res) => res,
      errorHandler ? errorHandler : () => {}
    );

  // dedupe identical calls
  const dedupeMap = new Map();
  const dedupePendingCalls = (fn, ...args) => {
    const token = getToken && getToken();
    // generate key based on call arguments and token
    const key = JSON.stringify({ args, config }) + (token ?? "");
    const identicalUnresolvedCall = dedupeMap.get(key);
    // if identical call is already in progress, return its reference
    if (identicalUnresolvedCall) return identicalUnresolvedCall;
    // if no identical calls are in progress, return a new one
    else {
      const newCall = fn(...args);
      dedupeMap.set(key, newCall);
      newCall.catch(() => {}).finally(() => dedupeMap.delete(key));
      return newCall;
    }
  };

  aop.injectBeforeExecuting(calls, dedupePendingCalls);
  return calls;
};
