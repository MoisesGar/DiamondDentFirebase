//Modulos importados
import { signUpDB } from "./firebase.js";

//Rutas a objetos
    //login
// const signInO = document.getElementById('signIn');

window.addEventListener('DOMContentLoaded', () =>{
    console.log('working loaded')
});

signUp.addEventListener('click', (e) =>{
    e.preventDefault(); 
    console.log(username.value,password.value, email.value)
    console.log('enviando registro')
    signUpDB(username.value,email.value, password.value,);
})


const getDate = () =>{
    const dt = new Date();
    return dt;
}

