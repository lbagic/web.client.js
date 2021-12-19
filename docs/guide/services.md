# Service Layer

Service layer is the one responsible to create and handle communications between the outside world and your data layer (Vuex Store).

> A strong suggestion is to keep it minimal and expose just simple functions that make calls to external providers.

## Creating API Endpoint

Application Programming Interface (or API for short) is a set of definitions which allows two applications to talk to each other.

In most cases that other application will be Sintezis backend application.

#### To create an API endpoint, we can use the `createApi` factory method.

The factory method takes the following arguments:

```ts
type CreateApiConfig = {
  baseUrl: String;
  requestHandler?: Function;
  responseHandler?: Function;
  errorHandler?: Function;
  getToken?: Function;
};
```

#### Example - creating a basic API endpoint

```js
// ./src/services/base/Api.js
export const Api = {
  sampleEndpoint: createApi({ baseUrl: "https://sample.endpoint.url" }),
};
```

#### Example - adding another enpoint; Sintezis API endpoint

```js
// ./src/services/base/Api.js
export const Api = {
  sampleEndpoint: createApi({ baseUrl: "https://sample.endpoint.url" }),
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
};
```

The `Api.snt` endpoint has configured the following:

- `baseURL` - string specifying endpoint url
- `getToken` function - enables automatic auth handling
- `responseHandler` function - flattens the response for easier management
- `errorHandler` function - flattens the error response and provides a handler for 401 response

## Creating Service Endpoint

Service endpoints are a subset of an API endpoint. Each service endpoint maps to a specific resource of the API endpoint.

#### To quickly scaffold service endpoints, we can use `createServiceCrud` function.

The function takes two parameters: `API Endpoint` and a `resource URI`;<br>
and it outputs an object with the following methods `get(id)`, `getAll`, `create(data)`, `update(data)`, `delete(id)`.

#### Example - creating a simple UserService with CRUD calls

```js
// ./src/services/UserService.js
import { createServiceCrud } from "../utils/crud";
import { Api } from "./base/Api";

export const UserService = createServiceCrud(Api.snt, "/users");
```

As an example, after using the `createServiceCrud` for our Users resource, we can easily manage our Users by doing `UserService.getAll()`, or `UserService.create(user)`, or any of the above mentioned methods.

::: danger
To take advantage of `createServiceCrud`, the response from Api endpoint must at least have the following response signature.

```ts
type ApiResponse = { payload: Object | Object[] };
```

Tip: We can leverage the **_createApi - responseHandler_** option to achieve that.

:::

#### Example - extended UserService

```js
// ./src/services/UserService.js
import { createServiceCrud } from "../utils/crud";
import { FacebookAuth } from "./auth-providers/FacebookAuth";
import { GoogleAuth } from "./auth-providers/GoogleAuth";
import { TwitterAuth } from "./auth-providers/TwitterAuth";
import { Api } from "./base/Api";

export const UserService = {
  // crud calls
  ...createServiceCrud(Api.snt, "/users"),
  // socials
  addGoogleSocial: (id) =>
    GoogleAuth.signIn().then((res) =>
      Api.post(`users/${id}/add_social/google`, { token: res.access_token })
    ),
  addFacebookSocial: (id) =>
    FacebookAuth.signIn().then((res) =>
      Api.post(`users/${id}/add_social/facebook`, { token: res.accessToken })
    ),
  addTwitterSocial: (id) =>
    TwitterAuth.signIn().then((res) =>
      Api.post(`users/${id}/add_social/twitter`, {
        token: res.credential.accessToken,
        secret: res.credential.secret,
      })
    ),
  // payments
  addPaypal: (id, data) =>
    Api.post(`users/${id}/add_payment_method/paypal`, data),
  addStripe: (id, data) =>
    Api.post(`users/${id}/add_payment_method/stripe`, data),
  deletePaymentMethod: (id, paymentMethodId) =>
    Api.delete(`users/${id}/payment_methods/${paymentMethodId}`),
  getPaymentMethods: (id) => Api.get(`users/${id}/payment_methods`),
};
```
