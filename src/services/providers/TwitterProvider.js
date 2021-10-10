import firebase from "firebase/app";
import { Firebase } from "../base/Firebase";

const twitterAuth = new firebase.auth.TwitterAuthProvider();

export const TwitterProvider = {
  signIn: () => Firebase.auth().signInWithPopup(twitterAuth),
};
