const clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;

const config = {
  client_id: clientId,
  scope: "profile email",
  prompt: "select_account",
};

const install = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

const init = () =>
  new Promise((resolve, reject) =>
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init(config)
        .then(() => resolve(window.gapi))
        .catch(reject);
    })
  );

export const GoogleAuth = {
  instance: null,
  isAuthorized: false,
  isInit: false,

  init: () =>
    install()
      .then(init)
      .then((gapi) => {
        GoogleAuth.instance = gapi.auth2.getAuthInstance();
        GoogleAuth.isInit = true;
        GoogleAuth.isAuthorized = GoogleAuth.instance.isSignedIn.get();
      })
      .catch((e) => {
        if (process.env !== "productin") console.error(e);
      }),

  signIn: () =>
    new Promise((resolve, reject) => {
      if (!GoogleAuth.instance) {
        reject(new Error("GoogleAuth instance not initiated"));
        return;
      }
      GoogleAuth.instance
        .signIn()
        .then((googleUser) => {
          GoogleAuth.isAuthorized = GoogleAuth.instance.isSignedIn.get();
          resolve({
            ...googleUser,
            access_token: googleUser.getAuthResponse().access_token,
          });
        })
        .catch((err) => {
          if (err.error === "popup_closed_by_user") return;
          else reject({ msg: "Google signin unavailable" });
        });
    }),
};

if (clientId) GoogleAuth.init();
