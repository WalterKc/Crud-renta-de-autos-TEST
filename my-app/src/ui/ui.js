import { obtenerDatosIniciales } from "../services/service";
export async function mostratDatosTest(valor) {
  let contenedorTest = document.querySelector("#TEST");
  contenedorTest.innerHTML = JSON.stringify(valor);
}
export function boton(evento) {
  let boton = document.querySelector("#menu-Desplegable");
  console.log(evento);
}
export let botonActivo = false;

export function eventos(testE) {
  let boton = document.querySelector("#menu-Desplegable");
  let click = document.querySelector(".app");

  console.log(testE);
  if (testE === boton && botonActivo === false) {
    //alert(" ES EL BOTON QUE QUEREMOS");
    botonActivo = true;
    console.log("BOTON ACTIVO?", botonActivo);
  } else if (botonActivo) {
    botonActivo = false;
    console.log("BOTON ACTIVO?", botonActivo);
  } else {
    botonActivo = false;
    console.log("BOTON ACTIVO?", botonActivo);
  }
  return botonActivo;
}
export function eventosV2(testE, estado, control) {
  let boton = document.querySelector("#menu-Desplegable");

  //console.log(testE);
  if (testE === boton && estado === false) {
    alert(" ES EL BOTON QUE QUEREMOS");
    control(true);
  } else if (estado) {
    control(false);
  } else {
    control(false);
  }

  //
}

export function eventosV3(estado, control) {
  //console.log(testE);
  if (estado === true) {
    alert(" ES EL BOTON QUE QUEREMOS V3");
    control(false);
  } else {
    //control(true);
  }

  //
}
