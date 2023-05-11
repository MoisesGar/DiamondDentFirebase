// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
//     import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHTLjpLCsO-Zsl7my0ZIbO6wJrI61ye5g",
  authDomain: "dimonddent-68852.firebaseapp.com",
  databaseURL: "https://dimonddent-68852-default-rtdb.firebaseio.com",
  projectId: "dimonddent-68852",
  storageBucket: "dimonddent-68852.appspot.com",
  messagingSenderId: "456359697128",
  appId: "1:456359697128:web:7eec13204e979d8792475d",
  measurementId: "G-7FSHC6LKFF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

