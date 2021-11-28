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

  // attach default logging interceptors
  if (process.env.NODE_ENV !== "production")
    instance.interceptors.response.use(
      (res) => {
        const { method, url } = res.config;
        console.log(method.toUpperCase(), url, res.status, res);
        return res;
      },
      (err) => {
        if (err.config) {
          const { method, url } = err.config;
          console.error(method.toUpperCase(), url, err?.response?.status, {
            ...err,
          });
        }
        throw err;
      }
    );

  // attach customly configured interceptors
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

  // buffer identical calls
  const bufferMap = new Map();
  const bufferIdenticalCalls = (fn, ...args) => {
    const token = getToken && getToken();
    // generate key based on call arguments and token
    const key = JSON.stringify({ args, config }) + (token ?? "");
    const identicalUnresolvedCall = bufferMap.get(key);
    // if identical call is already in progress, return its reference
    if (identicalUnresolvedCall) return identicalUnresolvedCall;
    // if no identical calls are in progress, call and return a new one
    else {
      const newCall = fn(...args);
      bufferMap.set(key, newCall);
      newCall.catch(() => {}).finally(() => bufferMap.delete(key));
      return newCall;
    }
  };

  aop.injectBeforeExecuting(calls, bufferIdenticalCalls);

  return calls;
};
