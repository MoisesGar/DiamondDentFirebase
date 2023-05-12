console.log('works');
// Import the functions you need from the SDKs you need
// import cambiarLogin from './JS/register.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getFirestore,collection , addDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
// const database = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser; 



//funtion signUpDB
export const signUpDB = (username, email, password) => {
  
  //Auth
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed in
    const {user} = userCredential;
    console.log(typeof(user.uid), user.uid)
    // addDoc(collection (db, 'users'),{    //addDoc crea la colleccion y pone un id aleatorio en caso de que no tengamos algo importante de id
      //creamos la referencia de la bd
    const userRef = doc(db, 'users',user.uid); 
    setDoc(userRef,{
      uid: user.uid,
      username: username,
      email: email,
      lastLogin: "",
    })
      setTimeout(() => {
        alert('Registro exitoso');
        changeW('../login.html');
      }, 200);
    // ...
    // return db.collection('users').doc(user.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(!email && !password){alert('Campos vacios')
    }else if (errorMessage == 'Firebase: Error (auth/email-already-in-use).'){
      alert('Email en uso')
    }else if (errorMessage == 'Firebase: Error (auth/invalid-email).' && email){
      alert('Introduzca un email valido')
    }else if (errorMessage =='Firebase: Error (auth/missing-password).' && !password){ 
      alert('Contraseña Vacia')
    }else if (errorMessage =='Firebase: Password should be at least 6 characters (auth/weak-password).' && password){ 
      alert('Contraseña muy debil, pruebe con mas de 6 caracteres')
    }else {
      alert(errorMessage);
    }
  })
}

//funtion login
export const signInF = (email,password, dt) => {
  signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    // Signed in
    const {user} = userCredential;
    update(ref(database, 'users/' + user.uid), {
      lastLogin: dt,
    });
    console.log('Logged')
    console.log(user);
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

export const currentUser =()=>{

}

//funtion change window
const changeW = (a) =>{
    window.location.href = a;
}

// signUp.addEventListener('click',(e) =>{
//   let email = document.getElementById('email').value;
//   let password = document.getElementById('password').value;
//   let username = document.getElementById('username').value;

// //Auth
// createUserWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {

//   // Signed in
//   const {user} = userCredential;
//   console.log(user.uid)
//     set(ref(database, 'users/' + user.uid), {
//       username: username,
//       email: email,
//       lastLogin: "",
//       suscription: "free"
//     });

//     setTimeout(() => {
//       alert('Registro exitoso');
//       cambiarLogin('./login.html');
//     }, 200);
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   if(!email && !password){alert('Campos vacios')
//   }else if (errorMessage == 'Firebase: Error (auth/email-already-in-use).'){
//     alert('Email en uso')
//   }else if (errorMessage == 'Firebase: Error (auth/invalid-email).' && email){
//     alert('Introduzca un email valido')
//   }else if (errorMessage =='Firebase: Error (auth/missing-password).' && !password){ 
//     alert('Contraseña Vacia')
//   }else if (errorMessage =='Firebase: Password should be at least 6 characters (auth/weak-password).' && password){ 
//     alert('Contraseña muy debil, pruebe con mas de 6 caracteres')
//   }else {
//     alert(errorMessage);
//   }
//   // ..
// });
// })


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