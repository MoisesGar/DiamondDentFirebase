import {app,auth,database,createUser} from './module.js';

signUp.addEventListener('click',(e) =>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    //Auth
    createUser(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('Registro exitoso');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('errorMessage');
        // ..
      });
})