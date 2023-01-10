//Declaración de constantes y variable global
const SALIR = "ESC";
const ESPACIO = " ";
const IVA = 1.21
let total = 0;

//Declaración de funciones
function sumarIVA(precio) {
    if (precio == 0) {
        return false
    }
    precio = precio * IVA
    return precio
}

function informarTurno(nombre, apellido, turno, servicio, precioServicio) {
    alert("SU TURNO HA SIDO CONFIRMADO\nNombre y apellido: " + nombre + ESPACIO + apellido + ESPACIO + "- Turno N°: " + turno + "\nEl servicio elegido es:" + ESPACIO + servicio + "\nEl precio del servicio es:" + ESPACIO + precioServicio)
}

//Bienvenida
alert("Bienvenidos a Nagú")

for (let turno = 1; turno <= 30; turno++) {
    //Pedir al usuario que se identifique
    let nombre = prompt("Ingrese su nombre o ingrese ESC para salir");
    while (nombre == ("" || " ")) {
        nombre = prompt("Ingrese un nombre válido")
    }
    if (nombre == SALIR) {
        break
    }
    let apellido = prompt("Ingrese su apellido o ingrese ESC para salir")
    while (apellido == ("" || " ")) {
        apellido = prompt("Ingrese un apellido válido")
    }
    if (apellido == SALIR) {
        break
    }
    //Pedir al usuario que elija un servicio y devolverle el turno con el precio del servicio elegido
    let servicio = prompt("Elija el número de servicio que desea realizarse\n1 Tradicional\n2 Semipermanente\n3 Kapping")
    let precioServicio
    switch (servicio) {
        case '1':
            precioServicio = sumarIVA(1500)
            servicio = "Tradicional"
            informarTurno(nombre, apellido, turno, servicio, precioServicio)
            break
        case '2':
            precioServicio = sumarIVA(2000)
            servicio = "Semipermanente"
            informarTurno(nombre, apellido, turno, servicio, precioServicio)
            break
        case '3':
            precioServicio = sumarIVA(2500)
            servicio = "Kapping"
            informarTurno(nombre, apellido, turno, servicio, precioServicio)
            break
        default:
            turno = turno - 1
            alert("La opción elegida es incorrecta, vuelva a solicitar su turno")
            break;
    }
}