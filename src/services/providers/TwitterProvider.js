import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import "../base/Firebase";

export const TwitterProvider = {
  signIn: () =>
    new Promise((resolve, reject) => {
      const auth = getAuth();
      signInWithPopup(auth, new TwitterAuthProvider())
        .then((result) => {
          const credential = TwitterAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const secret = credential.secret;
          const user = result.user;
          resolve({ token, secret, user });
        })
        .catch((error) => reject(error));
    }),
};
