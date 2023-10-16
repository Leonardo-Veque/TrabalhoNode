const express = require("express");
const { getApps, initializeApp  } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { collection, getDocs, getDoc, doc, addDoc, updateDoc, onSnapshot, deleteDoc, getFirestore } = require("firebase/firestore");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var firebaseConfig = {
    apiKey: "AIzaSyC5qkSZgSsPBXYpx08_JIZHMeBDBf2-8Qs",

    authDomain: "autenticar-4d625.firebaseapp.com",

    projectId: "autenticar-4d625",

    storageBucket: "autenticar-4d625.appspot.com",

    messagingSenderId: "244744229535",

    appId: "1:244744229535:web:60b14ec0079204cc0888aa",
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/login", async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect("/home");
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/home", async (req, res) => {
    const user = auth.currentUser;
    console.log(user); // Adicione esta linha
    if (user) {
        res.render("home", { user: user });
    } else {
        res.redirect("/feito");
    }
});

app.post("/home", async (req, res) => {
    const data = req.body
    console.log(data)
    await addDoc(collection(db, "receita"), {
        id: 1,
        nome: data.authnome,
        ingrediente: data.ingrediente,
    })
        .then(() => {
            console.log("Notas Salva");


        })
        .catch((error) => {
            console.log("erro" + error);
        });
});

app.listen(3000, () => console.log("Server started on port 3000"));


