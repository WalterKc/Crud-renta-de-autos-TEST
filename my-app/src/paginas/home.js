//import React from "react";

export function Home(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;
  const slider1 = estado.Slider1;
  const slider2 = estado.Slider2;

  //setPagina("home");
  //console.log("EXTRA", extra);
  //aca va el main, tiene header,main, y footer, lleva 2 sliders
  //el footer es igual en todos lados, por lo que se va a importar y ya

  return (
    <div>
      <header>
        <div>{nav}</div>
        <div>slider 1{slider1}</div>
        <div>slider 2{slider2}</div>
      </header>
      <main id="Test">slider 2</main>
    </div>
  );
}
