import {Booking} from './firebase.js'

//Campos del formulario
const nombreInput = document.querySelector('#nombre');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const motivoInput = document.querySelector('#motivo');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita);

let editando = false;


// Eventos
eventListeners();
function eventListeners() {
    nombreInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    motivoInput.addEventListener('change', datosCita);
}

const citaObj = {
    nombre: '',
    fecha: '',
    hora:'',
    motivo: ''
}


function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
}

// CLasses
class Citas {
    constructor() {
        this.citas = []
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   imprimirCitas({citas}) { // Se puede aplicar destructuring desde la función...
       
        this.limpiarHTML();

        citas.forEach(cita => {
            const {nombre, fecha, hora, motivo, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // scRIPTING DE LOS ELEMENTOS...
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.innerHTML = `${nombre}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const motivoParrafo = document.createElement('p');
            motivoParrafo.innerHTML = `<span class="font-weight-bolder">Motivo: </span> ${motivo}`;

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Cancelar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Reagendar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            // Agregar al HTML
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(motivoParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        });    
   }

   limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}

const ui = new UI();
const administrarCitas = new Citas();

function nuevaCita(e) {
    e.preventDefault();

    const {nombre, fecha, hora, motivo } = citaObj;

    // Validar
    if( nombre === ''  || fecha === ''  || hora === '' || motivo === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        Booking(citaObj);
        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
        console.log(citaObj);
        Booking(citaObj);
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.nombre = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.motivo = '';
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
    Booking(citaObj);
}

function cargarEdicion(cita) {

    const {nombre, fecha, hora, motivo, id } = cita;

    // Reiniciar el objeto
    citaObj.nombre = nombre;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.motivo = motivo;
    citaObj.id = id;

    // Llenar los Inputs
    nombreInput.value = nombre;
    fechaInput.value = fecha;
    horaInput.value = hora;
    motivoInput.value = motivo;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
    console.log(cita)
    console.log(citaObj)


}

logOut.addEventListener('click', (e) =>{
        window.location.href= './login.html';

  })