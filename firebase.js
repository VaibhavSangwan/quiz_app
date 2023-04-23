import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...  

  apiKey: "AIzaSyDO-e46bMr6wNlsVOeYCv2hgcBYeLFNA7I",
  authDomain: "treasure-app-a9a21.firebaseapp.com",
  projectId: "treasure-app-a9a21",
  storageBucket: "treasure-app-a9a21.appspot.com",
  messagingSenderId: "255084907014",
  appId: "1:255084907014:web:18b9230eed75c542349187",
  measurementId: "G-JBJDFWH9JK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
