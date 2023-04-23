import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...  

    apiKey: "AIzaSyDu1O9cw1nrPp7tnhbze1hD00jUJv_Ct40",
    authDomain: "treasure-hunt-puzzle.firebaseapp.com",
    projectId: "treasure-hunt-puzzle",
    storageBucket: "treasure-hunt-puzzle.appspot.com",
    messagingSenderId: "85677855410",
    appId: "1:85677855410:web:4b59cdc7e8a9906c9a2fab",
    measurementId: "G-RDGT25TKVF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);