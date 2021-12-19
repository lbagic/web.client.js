const clientId = process.env.VUE_APP_FACEBOOK_CLIENT_ID;

const config = {
  appId: clientId,
  cookie: true,
  xfbml: true,
  version: "v8.0",
};

const install = () => {
  const script = document.createElement("script");
  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  document.body.appendChild(script);
};

export const FacebookAuth = {
  instance: null,
  isAuthorized: false,
  isInit: false,

  init: () => {
    install();
    window.fbAsyncInit = () => {
      window.FB.init(config);
      FacebookAuth.instance = window.FB;
    };
  },

  signIn: () =>
    new Promise((resolve, reject) => {
      if (!FacebookAuth.instance) {
        reject(new Error("FacebookAuth instance not initiated"));
        return;
      }
      FacebookAuth.instance.login((response) => {
        if (response.authResponse) resolve(response.authResponse);
        else {
          if (response.authResponse === null && response.status === "unknown")
            return;
          else reject({ msg: "Facebook signin unavailable" });
        }
      });
    }),
};

if (clientId) FacebookAuth.init();
