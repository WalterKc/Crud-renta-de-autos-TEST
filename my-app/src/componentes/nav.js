import React, { useState } from "react";
import { boton } from "../ui/ui";
//import image from "../img/pokedex2.png";
import { eventosV3 } from "../ui/ui";

export function Nav(estado) {
  const estadoActual = estado.estado;
  const setEstado = estado.set;
  console.log("ESTADO NAV", estadoActual);
  return (
    <nav className="navbar sticky-top navbar-light bg-white" id="nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand" href="" id="nav-bar-nombre"></a>

        <button type="button" className="btn btn-primary" id="boton-siguiente">
          nombre Pagina
        </button>

        <button
          onClick={() => setEstado(!estadoActual)}
          type="button"
          className="btn btn-primary"
          id="menu-Desplegable"
        >
          menu Desplegable
        </button>
      </nav>
    </nav>
  );
}
