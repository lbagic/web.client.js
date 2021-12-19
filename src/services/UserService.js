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
