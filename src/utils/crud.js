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
 * }} Returns crud methods.
 */

export const createServiceCrud = (api, url) => ({
  get: (id, config = {}) => api.get(`${url}/${id}`, config),
  getAll: (config = {}) => api.get(url, config),
  create: (data = {}, config = {}) => api.post(url, data, config),
  update: (id, data = {}, config = {}) => api.put(`${url}/${id}`, data, config),
  delete: (id, config = {}) => api.delete(`${url}/${id}`, config),
});
