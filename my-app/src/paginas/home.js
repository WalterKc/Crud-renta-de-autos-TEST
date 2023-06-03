//import React from "react";
import "./home.css";

export function Home(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;
  const slider1 = estado.Slider1;
  const slider2 = estado.Slider2;

  return (
    <div>
      <header>
        <div id="navPrincial">{nav}</div>
      </header>
      <main id="Test">
        <div>slider 1{slider1}</div>
        <div>slider 2{slider2}</div>
      </main>
    </div>
  );
}
