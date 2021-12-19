import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.VUE_APP_STRIPE_SECRET;

let instance = undefined;
const init = () =>
  new Promise((resolve, reject) => {
    loadStripe(stripeKey)
      .then((stripe) => {
        instance = stripe;
        resolve(stripe);
      })
      .catch(reject);
  });

export const StripeProvider = {
  getInstance: () =>
    new Promise((resolve, reject) => {
      if (instance) resolve(instance);
      else init().then(resolve).catch(reject);
    }),
};

if (stripeKey) init();
