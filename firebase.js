import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...  

    apiKey: "AIzaSyA9E6Q6csEDNO2xuR4fumQ2kR9w57rtpdY",
  authDomain: "quiz-treasure-app.firebaseapp.com",
  projectId: "quiz-treasure-app",
  storageBucket: "quiz-treasure-app.appspot.com",
  messagingSenderId: "803280089887",
  appId: "1:803280089887:web:74319123bcb963a2efb62a",
  measurementId: "G-1B2N0GL7FL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
