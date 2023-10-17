const express = require("express");
const { get } = require("express/lib/response");

const { getApps, initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getDoc } = require("firebase/firestore");
const {
  collection,
  getDocs,
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
    res.redirect("/");
  }
});

app.post("/home", async (req, res) => {
  try {
    const receitas = {
      ingredientes: req.body.ingredientes,
      nome: req.body.nome,
    };
    const add = await addDoc(receitasRef, receitas);
    res.redirect("/feito");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/feito", async (req, res) => {
  try {
    const pegar = await getDocs(receitasRef);
    let arr = [];
    pegar.forEach((doc) => {
      let dt = doc.data();
      let obj = {
        ingredientes: dt.ingredientes,
        nome: dt.nome,
        id: doc.id,
      };
      arr.push(obj);
    });
    if (arr.length == 0) {
      res.render("feito", { arr: [] });
      return;
    }
    res.render("feito", { arr });
  } catch (error) {
    res.send(error);
  }
});

app.get("/:id/edit", async (req, res) => {
  try {
    const docRef = doc(db, "receita", req.params.id);
    const pegar = await getDoc(docRef);
    if (pegar.exists()) {
      console.log(pegar.data());
    } else {
      alert("Não existe receitas");
    }
    const ingrediente = pegar.data();
    ingrediente.id = pegar.id;
    res.render("edit", { ingrediente });
  } catch (error) {
    res.send(error);
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    console.log("Aquii");
    const docRef = doc(db, "receita", req.params.id);
    const pegar = await getDoc(docRef);
    const newName = req.body.newName;
    const newIngrediente = req.body.newIngredientes;
    console.log(req.body);

    await updateDoc(docRef, {
      nome: newName,
      ingredientes: newIngrediente,
    });
    res.redirect("/feito");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    const docRef = doc(db, "receita", req.params.id);
    await deleteDoc(docRef);
    res.redirect("/feito");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(6969, () => console.log("Server started on port 6969. Nice"));
