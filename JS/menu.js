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
import {changeW} from './firebase.js';
const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', () =>{
    console.log('click');
    changeW('./login.html')
})