import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCC5y3oZuOfSx1sSBWmUF8nxvZ6QMT3WyQ",
  authDomain: "login-page-d2463.firebaseapp.com",
  projectId: "login-page-d2463",
  storageBucket: "login-page-d2463.appspot.com",
  messagingSenderId: "732968219508",
  appId: "1:732968219508:web:daae99dabe1f878a053221",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseApp);
export const authentication = getAuth(firebaseApp);
