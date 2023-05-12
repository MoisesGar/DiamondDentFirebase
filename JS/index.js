//Modulos importados
import { signInF } from "./firebase.js";

//Rutas a objetos
    //login
// const signInO = document.getElementById('signIn');

window.addEventListener('DOMContentLoaded', () =>{
    console.log('working loaded')
});

signIn.addEventListener('click', (e) =>{
    e.preventDefault(); 
    console.log(password.value, email.value)
    console.log('enviado')
    signInF(email.value, password.value);
})


