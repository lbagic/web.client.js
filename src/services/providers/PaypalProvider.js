const clientId = process.env.VUE_APP_PAYPAL_CLIENT_ID;
const baseUrl = process.env.VUE_APP_PAYPAL_BASE_URL;
const scope = "openid profile email";
const returnUrl = process.env.VUE_APP_PAYPAL_RETURN_URL;

let instance = undefined;

const init = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      instance = window.paypal;
      resolve(window.paypal);
    });
  });

if (clientId && baseUrl && returnUrl) init();

export const PaypalProvider = {
  getInstance: () =>
    new Promise((resolve, reject) => {
      if (instance) resolve(instance);
      else init().then(resolve).catch(reject);
    }),
  signup: () => {
    location.href = `${baseUrl}/connect?flowEntry=static&client_id=${clientId}&scope=${scope}&redirect_uri=${returnUrl}`;
  },
};
