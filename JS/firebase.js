console.log('works');
// Import the functions you need from the SDKs you need
// import cambiarLogin from './JS/register.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getFirestore,collection , addDoc, setDoc, doc, getDocs, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
// const user = auth.currentUser;
let currenUser; 



//funtion signUpDB
export const signUpDB = (username, email, password) => {
  
  //Auth Creacion con Emial y Password
createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {

    // Signed in
    const {user} = userCredential;
    console.log(typeof(user.uid), user.uid)
    // addDoc(collection (db, 'users'),{    //addDoc actualiza o crea la colleccion y pone un id aleatorio en caso de que no tengamos algo importante de id
      //creamos la referencia de la bd
    const userRef = doc(db, 'users', user.uid); 
    await setDoc(userRef,{
      uid: user.uid,
      username: username,
      email: email,
      lastLogin: "",
      lastLogOut:"",
    });
        console.log('Registro exitoso');
        changeW('../login.html');
    // ...
  })
  .catch((error) => {
    const {code, message} = error;
    printError(email, password, message);
  })
}//End signUpDB

//funtion login
export const signInF = (email,password) => {
  signInWithEmailAndPassword(auth, email, password)

  .then(async (userCredential) => {
    // Signed in
    const {user} = userCredential;
    // update(ref(database, 'users/' + user.uid), {
    //   lastLogin: dt,
    // });
    console.log('Logged')
    console.log(user);
    const data = await getoneElement(doc(db, "users", user.uid));
    console.log(data)

    updateLastLogin(user.uid);

    setTimeout(() => {
      if(data.lastLogin.length > 0){
        console.log('ve al menu')
        changeW('../menu.html');
      }else{
        console.log('registra tus datos')
        changeW('../menu.html');
      }
    }, 500);
  })
  .catch((error) =>{
    const {code, message} = error;
    printError(email, password, message);
  })
} 
//Update for lastlogin date
const updateLastLogin = (user) => {
  const dt = getDate();
  console.log(dt);
  const userRef = doc(db, 'users',user); 
  updateDoc(userRef,{
          lastLogin: dt,
        })
}
//funtion logout
export const signOutF = () =>{
  console.log('logged out');
}

export const currentUser =()=>{
}
//funtion getoneElement
export const getoneElement = async (Ref) => {

const docRef = Ref; //doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if(docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  return docSnap.data();
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
}
//funtion change window
export const changeW = (a) =>{
    window.location.href = a;
}
//funtion getdate
export const getDate = () =>{
  const dt = new Date();
  return dt;
}
//function errors
export const printError = (email, password, errorMessage) => {
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