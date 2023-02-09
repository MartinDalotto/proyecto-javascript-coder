//Declaración de constantes y variable global
const listadoInputs = document.querySelectorAll(".turno-input")
const form = document.getElementById("form")
const listadoDeClientes = [];
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let dni = document.getElementById("dni")
let celular = document.getElementById("celular")
let fecha = determinarFecha()
let servicio = document.getElementById("servicio")

//Declaración de funciones

function determinarFecha() {
    let fecha = document.getElementById("fecha").value

    let fecha_cadena = new Date(fecha);
    let meses = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];
    let dia = fecha_cadena.getDate();
    let mesIndex = fecha_cadena.getMonth();
    let anio = fecha_cadena.getFullYear();
    let turnoFecha = `${dia} ${meses[mesIndex]} ${anio}`;
    return turnoFecha
}

function validarSolictud() {
    form.lastElementChild.innerHTML = ``
    let condicion = true;
    listadoInputs.forEach((element) => {
        element.lastElementChild.innerHTML = "";
    })

    if (nombre.value.lenght < 1 || nombre.value.trim() == "") {
        pedirDatoValido("nombre");
        condicion = false;
    }

    if (apellido.value.lenght < 1 || apellido.value.trim() == "") {
        pedirDatoValido("apellido");
        condicion = false;
    }

    if (dni.value.lenght < 8 || dni.value.trim() == "" || isNaN(dni.value)) {
        pedirDatoValido("dni");
        condicion = false;
    }

    if (celular.value.lenght < 9 || celular.value.trim() == "" || isNaN(celular.value)) {
        pedirDatoValido("celular");
        condicion = false;
    }

    if (fecha == "") {
        pedirDatoValido("fecha");
        condicion = false;
    }

    if (servicio.value.lenght < 1 || nombre.value.trim() == "") {
        pedirDatoValido("servicio");
        condicion = false;
    }
    return condicion;
}

function pedirDatoValido(datoPedido) {
    let alerta = document.querySelector(`.${datoPedido}`);
    alerta.lastElementChild.innerHTML = "Ingresá un dato válido"
}

function enviarSolicitud() {
    form.reset();
    form.lastElementChild.innerHTML = `SU SOLICITUD HA SIDO RECIBIDA`
}

//Declaración de clases

class Cliente {
    constructor(apellido, nombre, dni, celular, servicio) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.celular = celular;
        this.servicio = servicio;
    }
}

// Formulario

document.getElementById("pedido").innerHTML = "SOLICITÁ TU TURNO";

form.addEventListener("submit", (e) => {
    listadoDeClientes.push(new Cliente (apellido.value, nombre.value, dni.value, celular.value, servicio.value));
    
    listadoDeClientes.sort(function (a, b) {
        if (a.apellido < b.apellido) { return -1; }
        if (a.apellido > b.apellido) { return 1; }
        return 0;
    })

    localStorage.setItem ("listadodeClientes", JSON.stringify (listadoDeClientes))

    e.preventDefault();
    let condicion = validarSolictud();
    if (condicion) {
        enviarSolicitud();
    }
    
})

console.log(listadoDeClientes)
