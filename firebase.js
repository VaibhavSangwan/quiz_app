import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...  

     apiKey: "AIzaSyBEh0AqdxI9dd_w4zmw5rHnD7xgTwuanwE",
  authDomain: "quiz-app-e8756.firebaseapp.com",
  projectId: "quiz-app-e8756",
  storageBucket: "quiz-app-e8756.appspot.com",
  messagingSenderId: "893244706975",
  appId: "1:893244706975:web:58b28c01ab39f1ad0652aa",
  measurementId: "G-8531QMKN68"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
