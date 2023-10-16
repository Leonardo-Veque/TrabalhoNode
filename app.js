const express = require("express");

const { getApps, initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  getFirestore,
} = require("firebase/firestore");
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

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const receitasRef = collection(db, "receita");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", async (req, res) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    res.redirect("/home");
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/home", async (req, res) => {
  const user = auth.currentUser;
  // console.log(user); // Adicione esta linha
  if (user) {
    res.render("home", { user: user });
  } else {
    res.redirect("/feito");
  }
});

app.post("/home", async (req, res) => {
  try {
    const receitas = {
      ingredientes: req.body.ingredientes,
      nome: req.body.nome,
    };
    console.log(req.body);
    console.log(receitas);
    const add = await addDoc(receitasRef, receitas);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(6969, () => console.log("Server started on port 6969"));
