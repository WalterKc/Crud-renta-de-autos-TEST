import React, { useState } from "react";
import { botonActivo } from "../ui/ui";

export function soloFlag(estado) {
  console.log(" SOLO FLAG", estado);
  DatosMainFinales(estado);
}
function DatosMain() {
  //const [selector, setSelector] = useState(false);
  console.log(" DATOS MAIN", botonActivo);

  return <div id="TEST_REACT">ACA VA EL MAIN </div>;
}
function DatosMain2() {
  //const [selector, setSelector] = useState(false);
  console.log(" DATOS MAIN", botonActivo);

  return <div id="TEST_REACT">ACA VA EL MENU DEL BOTON </div>;
}
const si = <div id="TEST_REACT">ACA VA EL MENU DEL BOTON </div>;
const no = <div id="TEST_REACT">ACA VA EL MAIN </div>;
export function DatosMainFinales(estado) {
  if (estado) {
    return <div id="TEST_REACT">ACA VA EL MENU DEL BOTON </div>;
  } else {
    return <div id="TEST_REACT">ACA VA EL MAIN </div>;
  }
}
