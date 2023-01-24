//Declaración de constantes y variable global
const SALIR = "ESC";
const IVA = 1.21;
let total = 0;
const listadoDeClientes = [];

//Declaración de funciones
function sumarIVA(precio) {
    if (precio == 0) {
        return false
    }
    precio = precio * IVA
    return precio
}

function determinarFecha() {
    let fecha = prompt(`Ingrese la fecha que desea sacar turno (MM/DD/AAAA)`)
    while (fecha == "" || fecha == " ") {
        fecha = prompt(`Ingrese una fecha válida`)
    }
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

function informarTurno(nombre, apellido, turno, fecha, servicio, precioServicio) {
    alert(`SU TURNO HA SIDO CONFIRMADO\nNombre y apellido: ${nombre} ${apellido}\nTurno N° ${turno} - Fecha: ${fecha}\nEl servicio elegido es: ${servicio}\nEl precio del servicio es: ${precioServicio}`)
}

//Bienvenida
alert(`Bienvenidos a Nagú`)

for (let turno = 1; turno <= 30; turno++) {
    //Pedir al usuario que se identifique
    let nombre = prompt(`Ingrese su nombre o ingrese ESC para salir`);
    while (nombre == "" || nombre == " ") {
        nombre = prompt(`Ingrese un nombre válido`)
    }
    if (nombre == SALIR) {
        break
    }
    let apellido = prompt(`Ingrese su apellido o ingrese ESC para salir`)
    while (apellido == "" || apellido == " ") {
        apellido = prompt(`Ingrese un apellido válido`)
    }
    if (apellido == SALIR) {
        break
    }
    let dni = prompt(`Ingrese su número de DNI (sin puntos)`);
    while (dni == "" || dni == " ") {
        dni = prompt(`Ingrese un número de DNI válido`)
    }
    let celular = prompt(`Ingrese su número de celular`);
    while (celular == "" || celular == " ") {
        celular = prompt(`Ingrese un número de celular válido`)
    }
    let fecha = determinarFecha();

        //Pedir al usuario que elija un servicio y devolverle el turno con la fecha, el servicio y el precio del servicio elegido
        let servicio = prompt("Elija el número de servicio que desea realizarse\n1 Tradicional\n2 Semipermanente\n3 Kapping")
        let precioServicio
        switch (servicio) {
            case '1':
                precioServicio = sumarIVA(1500)
                servicio = "Tradicional"
                informarTurno(nombre, apellido, turno, fecha, servicio, precioServicio)
                break
            case '2':
                precioServicio = sumarIVA(2000)
                servicio = "Semipermanente"
                informarTurno(nombre, apellido, turno, fecha, servicio, precioServicio)
                break
            case '3':
                precioServicio = sumarIVA(2500)
                servicio = "Kapping"
                informarTurno(nombre, apellido, turno, fecha, servicio, precioServicio)
                break
            default:
                turno = turno - 1
                alert(`La opción elegida es incorrecta, vuelva a solicitar su turno`)
                break;
        }

        listadoDeClientes.push({ apellido:apellido, nombre:nombre, id:dni, celular:celular, servicio:servicio, fecha:fecha,})
    }

    listadoDeClientes.sort(function (a, b) {
        if (a.apellido < b.apellido) { return -1; }
        if (a.apellido > b.apellido) { return 1; }
        return 0;
    })

    console.log(listadoDeClientes)