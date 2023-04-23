// Require express and create an instance of it
import express from 'express';
import bodyParser from 'body-parser';
// import ejs from ejs;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence } from "firebase/auth";
import { auth, db } from './firebase.js';
import { setDoc, getDoc, doc, addDoc, collection } from "firebase/firestore";
const quiz = {};
const ind = {
    vocabulary: "",
    economic: "vocabulary",
    drama: "economic",
    intelligence: "drama",
    listening: "intelligence",
    sports: "listening",
}
const index = {
    vocabulary: 0,
    economic: 1,
    drama: 2,
    intelligence: 3,
    listening: 4,
    sports: 5,
}
var app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
// on the request to root (localhost:3000/)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// On localhost:3000/welcome
app.get('/', (req, res) => {
    res.render('loginMethod')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/welcome/:uid', (req, res) => {
    const id = req.params.uid;
    setData(id, quiz[id]);
    res.render('welcome', { UID: id });
})
app.get('/quiz/:q/:ans/:uid', (req, res) => {
    const id = req.params.uid;
    const q = req.params.q;
    const ans = req.params.ans;
    res.render(`${q}`, { UID: id, ans: ans })
})
app.post('/quiz/:q/:ans/:uid', (req, res) => {
    const id = req.params.uid;
    const q = req.params.q;
    if (q !== "vocabulary") {
        quiz[id][ind[q]].time = req.body.time;
        quiz[id].hightest_score = index[ind[q]] + 1;
        console.log(quiz[id].hightest_score);
    }
    const ans = req.params.ans;
    res.render(`${q}`, { UID: id, ans: ans })
})
app.post("/exit/:uid", (req, res) => {
    const id = req.params.uid;
    quiz[id].sports.time = req.body.time;
    quiz[id].hightest_score = 6;
    console.log(quiz[id].hightest_score);

    setData(id, quiz[id]);
    res.render('exit', { UID: id })

})



// --------------------------------------------------------------------------------
app.post('/register', function (req, res) {
    const email = req.body.email;
    const Name = req.body.name;
    const password = req.body.password;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // console.log(userCredential)
            const user = userCredential.user;
            set(user?.uid);
            try {
                const alluser = async () => {
                    const docRef = doc(db, "alluser", "users");
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        let serverData = docSnap.data();
                        console.log(serverData.users);
                        await setDoc(doc(db, "alluser", "users"), {
                            users: [
                                ...serverData.users,
                                {
                                    id: user?.uid,
                                    name: Name,
                                    emailID: email
                                }
                            ]
                        });
                        //return data.
                    } else {
                        await setDoc(doc(db, "alluser", "users"), {
                            users: [
                                {
                                    id: user?.uid,
                                    name: Name,
                                    emailID: email
                                }
                            ]
                        });
                        console.log("No such document!");
                    }
                    console.log("HELLO");
                }
                alluser();
                // console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            res.status(200).redirect('/');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert(errorMessage)
            console.log(errorMessage)
            // res.status(404).send('Not Done');
            res.status(404).render('error', { err: errorMessage });
            // ..
        });
});
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user?.uid);
            quiz[user?.uid] = {
                vocabulary: { time: "", },
                economic: { time: "" },
                drama: { time: "" },
                intelligence: { time: "" },
                listening: { time: "" },
                sports: { time: "" },
                hightest_score: "0"
            }

            res.status(200).redirect(`/welcome/${user?.uid}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            res.status(404).render('error', { err: errorMessage });

        });
})
app.get('/alluserdata', async (req, res) => {
    const docRef = doc(db, "alluser", "users");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let serverData = docSnap.data();
        console.log(serverData.users);
        //return data.
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
})
app.get('/userdata/:userid', async (req, res) => {
    const docRef = doc(db, "users", req.params.userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let serverData = docSnap.data();
        console.log(serverData);
        //return data.
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
})
const setData = async (userid, userData) => {
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let serverData = docSnap.data();
        userData.hightest_score = Math.max(serverData.hightest_score, userData.hightest_score);
        console.log(userData);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    try {
        await setDoc(doc(db, "users", userid), {
            ...userData
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
const set = async (userid) => {
    try {
        await setDoc(doc(db, "users", userid), {
            vocabulary: { time: "", },
            economic: { time: "" },
            drama: { time: "" },
            intelligence: { time: "" },
            listening: { time: "" },
            sports: { time: "" },
            hightest_score: "0"
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(process.env.PORT||3000, function () {
    console.log('Example app listening on port 3000.');
});
