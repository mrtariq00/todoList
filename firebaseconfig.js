import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxOhCEoysQn1H1XI5cJQxDK3aY-__-QmY",
    authDomain: "todo-88101.firebaseapp.com",
    projectId: "todo-88101",
    storageBucket: "todo-88101.firebasestorage.app",
    messagingSenderId: "811919070182",
    appId: "1:811919070182:web:e69c06a2692a1c9583bc27",
    measurementId: "G-0K4KNF95B7"
  };
 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
};