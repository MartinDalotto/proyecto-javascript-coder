//Declaración de constantes y variable global
const listadoInputs = document.querySelectorAll(".turno-input")
const form = document.getElementById("form")
const listadoDeClientes = [];
const IVA = 1.21
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let dni = document.getElementById("dni")
let celular = document.getElementById("celular")
let fecha
let servicioElegido
let precioServicio
let myTimeout = setTimeout(mostrarMensaje, 30000);
let clientes

//Declaración de funciones

function determinarFecha() {
    let fecha = document.getElementById("fecha")

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

    return condicion;
}

function pedirDatoValido(datoPedido) {
    let alerta = document.querySelector(`.${datoPedido}`);
    alerta.lastElementChild.innerHTML = "Ingresá un dato válido"
}

function elegirServicio() {
    let lista = document.getElementById("servicio");
    let servicioSeleccionado = lista.options[lista.selectedIndex].text;
    return servicioSeleccionado
}

function sumarIVA(monto) {
    if (monto == 0) {
        return false
    }
    monto = monto * IVA
    return monto
}

function determinarPrecio() {
    const servicios = document.getElementById("servicio").selectedIndex;
    let precio = (document.getElementsByTagName("option")[servicios].value);
    let precioServicio = sumarIVA(precio)
    return precioServicio
}

function enviarSolicitud() {
    form.reset();
    cargarSelect();
    Swal.fire({
        icon: 'success',
        title: 'Su turno ha sido solicitado',
        text: 'Nos comunicaremos con usted para informarle los horarios disponibles',
    })
}

function mostrarMensaje() {
    Swal.fire({
        title: '¿Estas ahi?',
        text: 'Completá el formulario para solicitar tu turno',
        icon: 'question',
        showCancelButton: false,
        showConfirmButton: false
    })
}

function cerrarMensaje() {
    Swal.close()
}

function reiniciarContador() {
    cerrarMensaje()
    clearTimeout(myTimeout);
    myTimeout = setTimeout(mostrarMensaje, 30000);
}

function cargarSelect() {
    let texto = `<option value="1500">Tradicional</option>
    <option value="2000">Semipermanente</option>
    <option value="2500">Kapping</option>`

    document.getElementById("servicio").innerHTML = texto
}

const existenClientes = async () => {
    const resp = await fetch('clientes.json');
    const data = await resp.json();
    if (data.length > 0) {
        clientes = [];
        await data.forEach((element) => {
            clientes.push(element);
        });
        localStorage.setItem("clientes", JSON.stringify(clientes))
    }
}

existenClientes()
clientes = JSON.parse(localStorage.getItem("clientes"))

function generarTabla(){
    
if (! document.getElementById("tabla-turnos")){
    tablaTurnos =
    `<table class="turnos-no-disponibles" id="tabla-turnos">
        <tr id="titulo">
            <th class="titulo-turnos-no-disponibles">Fechas no disponibles</th>
        </tr>
    </table>`
    ;

document.getElementById("tablaNoDisponibles").insertAdjacentHTML("afterend", tablaTurnos);

for (let i =0; i < clientes.length; i++){
    let fila = document.createElement("tr"),
    datos =
    `<td class="data">${clientes[i].fecha}</td>`
    ;
    fila.innerHTML = datos;
    document.getElementById("tabla-turnos").appendChild(fila)
}
}
}

//Declaración de clases

class Cliente {
    constructor(apellido, nombre, dni, celular, servicioElegido, precioServicio, fecha) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.celular = celular;
        this.servicioElegido = servicioElegido;
        this.precioServicio = precioServicio;
        this.fecha = fecha;
    }
}

// Formulario

document.getElementById("pedido").innerHTML = "SOLICITÁ TU TURNO";

document.addEventListener("mousemove", reiniciarContador)

document.getElementById("tablaNoDisponibles").addEventListener("click", generarTabla)

form.addEventListener("submit", (e) => {

    fecha = determinarFecha()
    servicioElegido = elegirServicio()
    precioServicio = determinarPrecio()

    listadoDeClientes.push(new Cliente(apellido.value, nombre.value, dni.value, celular.value, servicioElegido, precioServicio, fecha));

    listadoDeClientes.sort(function (a, b) {
        if (a.apellido < b.apellido) { return -1; }
        if (a.apellido > b.apellido) { return 1; }
        return 0;
    })

    localStorage.setItem("listadodeClientes", JSON.stringify(listadoDeClientes))

    e.preventDefault();
    let condicion = validarSolictud();
    if (condicion) {
        enviarSolicitud();
    }
})