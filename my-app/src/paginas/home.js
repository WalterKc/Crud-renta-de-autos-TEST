//import React from "react";

export function Home(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const setPagina = estado.setPagina;
  //setPagina("home");
  console.log("pagina Actual", paginaActual);

  return <h1>home</h1>;
}
