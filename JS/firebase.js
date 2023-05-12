console.log('works');
// Import the functions you need from the SDKs you need
// import cambiarLogin from './JS/register.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getFirestore,collection , addDoc} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser; 
const db = getFirestore();



//funtion signUpDB
export const signUpDB = (username, email, dt) => {
  addDoc(collection (db, 'user'+ user.uid),{
  })
}


//funtion login
export const signInF = (email,password, dt) => {
  signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    update(ref(database, 'users/' + user.uid), {
      lastLogin: dt,
    });
    console.log('Logged')
  })

  .catch((error) =>{
    const {code} = error;
    const {message} = error;
    alert(message);
  })
} 
//funtion logout
export const signOutF = () =>{
  console.log('logged out');
}

//funtion change window
const changeW = (a) =>{
    window.location.href = a;
}


//EVENTO CLICK SOBRE BOTON INICIAR SESION
// signIn.addEventListener('click', (e) =>{
  
//     let email = document.getElementById('email').value; 
//     let password = document.getElementById('password').value;
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           const dt = new Date();
//          //UPDATE AL ELEMENTO LASTLOGIN DENTRO DE LA BD DE FIREBASE
//             update(ref(database, 'users/' + user.uid), {
//           lastLogin: dt,
//         });

//     setTimeout(() => {
//         cambiarLogin('./menu.html');
//         console.warn('LOGIN')
//     }, 200);
//       // ...
//     })
//     .catch((error) => {
//        const errorCode = error.code;
//        const errorMessage = error.message;

//        alert(errorMessage)
//      });
//  })