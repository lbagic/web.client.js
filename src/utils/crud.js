/**
 * Scaffold crud calls for a service.
 *
 * @param {import("axios").AxiosInstance} api Axios instance.
 * @param {string} url Resource url.
 * @return {{
 *   get: (id: (string|number), config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   getAll: (config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   create: (data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   update: (id: (string|number), data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   delete: (id: (string|number), config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 * }} Returns service crud instance.
 */

export const createServiceCrud = (api, url) => ({
  get: (id, config = {}) => api.get(`${url}/${id}`, config),
  getAll: (config = {}) => api.get(url, config),
  create: (data = {}, config = {}) => api.post(url, data, config),
  update: (data = {}, config = {}) => {
    const id = data.id;
    delete data.id;
    return api.put(`${url}/${id}`, data, config);
  },
  delete: (id, config = {}) => api.delete(`${url}/${id}`, config),
});

/**
 * Scaffold crud calls for a module.
 *
 * @param {{
 *   get: (id: any, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   getAll: (config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   create: (data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   update: (id: any, data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   delete: (id: any, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 * }} serviceCrud Service crud instance.
 * @param {string} path Path to state expressed as a string.
 * @param {{
 *   get: { then: (ctx, res, id) => {}, catch: (ctx, err, id) => {}, finally: (ctx, id) => {} },
 *   getAll: { then: (ctx, res) => {}, catch: (ctx, err) => {}, finally: (ctx) => {} },
 *   create: { then: (ctx, res, data) => {}, catch: (ctx, err, data) => {}, finally: (ctx, data) => {} },
 *   update: { then: (ctx, res, {id, data}) => {}, catch: (ctx, err, {id, data}) => {}, finally: (ctx, {id, data}) => {} },
 *   delete: { then: (ctx, res, id) => {}, catch: (ctx, err, id) => {}, finally: (ctx, id) => {} },
 * }} hooks Optional promise hooks.
 * @return {{
 *   get: (id: any, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   getAll: (config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   create: (data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   update: (id: any, data: {}, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 *   delete: (id: any, config: import("axios").AxiosRequestConfig) => Promise<import("axios").AxiosResponse>,
 * }} Returns module crud instance (actions).
 */

export const createModuleCrud = (serviceCrud, path, hooks = {}) => {
  const pathName = path
    .split(".")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");

  return {
    [`get${pathName}`]: (ctx, id) => {
      if (!id) throw new Error(`Cannot get resource "${pathName}" without id.`);
      const promise = serviceCrud.get(id);
      promise
        .then(({ payload }) => ctx.commit(`add${pathName}`, payload))
        .catch(() => {});
      usePromiseHook(hooks.get, promise, ctx, id);
      return promise;
    },
    [`getAll${pathName}`]: (ctx) => {
      const promise = serviceCrud.getAll();
      promise
        .then(({ payload }) => ctx.commit(`set${pathName}`, payload))
        .catch(() => {});
      usePromiseHook(hooks.getAll, promise, ctx);
      return promise;
    },
    [`create${pathName}`]: (ctx, data) => {
      if (!data)
        throw new Error(`Cannot create resource "${pathName}" without data.`);
      const promise = serviceCrud.create(data);
      promise
        .then(({ payload }) => ctx.commit(`add${pathName}`, payload))
        .catch(() => {});
      usePromiseHook(hooks.create, promise, ctx, data);
      return promise;
    },
    [`update${pathName}`]: (ctx, data) => {
      if (!data)
        throw new Error(`Cannot update resource "${pathName}"" without data.`);
      if (!data.id)
        throw new Error(
          `Cannot update resource "${pathName}" without data.id.`
        );
      const promise = serviceCrud.update(data);
      promise
        .then(({ payload }) => ctx.commit(`add${pathName}`, payload))
        .catch(() => {});
      usePromiseHook(hooks.update, promise, ctx, data);
      return promise;
    },
    [`delete${pathName}`]: (ctx, id) => {
      if (!id)
        throw new Error(`Cannot delete resource "${pathName}" without id.`);
      const promise = serviceCrud.delete(id);
      promise.then(() => ctx.commit(`remove${pathName}`, id)).catch(() => {});
      usePromiseHook(hooks.delete, promise, ctx, id);
      return promise;
    },
  };
};

const usePromiseHook = (hook, promise, ctx, payload = undefined) => {
  if (!hook) return;
  promise
    .then((res) => {
      if (hook.then) hook.then(ctx, res, payload);
      return res;
    })
    .catch((err) => {
      if (hook.catch) hook.catch(ctx, err, payload);
    })
    .finally(() => {
      if (hook.finally) hook.finally(ctx, payload);
    });
};
