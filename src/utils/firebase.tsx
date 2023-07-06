import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA72za0r_67Y5dfyUXYZQNOFl3qx7j_0cI",
  authDomain: "testrun-42bfa.firebaseapp.com",
  projectId: "testrun-42bfa",
  storageBucket: "testrun-42bfa.appspot.com",
  messagingSenderId: "662343439569",
  appId: "1:662343439569:web:4c0322973bcbcd013421f0",
  measurementId: "G-P0WW852YHB",
};

const firebaseConfig = FIREBASE_CONFIG;
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore();
const auth = firebase.auth();
const provider = new GoogleAuthProvider();

export { auth, provider };
