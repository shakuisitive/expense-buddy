import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnj4XKHG0U74fE3kP9qZD2elbKr9-YNHU",
  authDomain: "mymoneyfinancetracker.firebaseapp.com",
  projectId: "mymoneyfinancetracker",
  storageBucket: "mymoneyfinancetracker.appspot.com",
  messagingSenderId: "1047159463162",
  appId: "1:1047159463162:web:c22e37aa53fa4f60f73d43",
  measurementId: "G-S0EC5FQBWG",
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const db = getFirestore();

export {
  firebaseConfig,
  projectFirestore,
  projectAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  db,
};
