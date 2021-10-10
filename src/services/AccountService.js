import { Api } from "./base/Api";

export const AccountService = {
  login: (data) => Api.snt.post("accounts/login/email", data),
  register: (data) => Api.snt.post("accounts/register/email", data),
  logout: () => Api.snt.post("accounts/logout"),
  recoverPassword: (data) => Api.snt.post("accounts/recover_password", data),
  resetPassword: (data) => Api.snt.post("accounts/reset_password", data),
  // googleLogin: () =>
  //   GoogleAuth.signIn().then((res) =>
  //     Api.post("accounts/login/google", { token: res.access_token })
  //   ),
  // facebookLogin: () =>
  //   FacebookAuth.signIn().then((res) =>
  //     Api.post("accounts/login/facebook", { token: res.accessToken })
  //   ),
  // twitterLogin: () =>
  //   TwitterAuth.signIn().then((res) =>
  //     Api.post("accounts/login/twitter", {
  //       token: res.credential.accessToken,
  //       secret: res.credential.secret,
  //     })
  //   ),
};
