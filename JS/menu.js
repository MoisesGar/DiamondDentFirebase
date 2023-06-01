// signIn.addEventListener('click',(e) =>{
//     //Auth
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//       });
// })
import {changeW,getoneElement} from './firebase.js';

window.addEventListener('DOMContentLoaded', () =>{
    console.log(localStorage.getItem('user'));
    // getoneElement()
})

const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', () =>{
    console.log('click');
    changeW('./login.html')
})