import React, { useState } from "react";
import { boton } from "../ui/ui";
//import image from "../img/pokedex2.png";
import { eventosV3 } from "../ui/ui";
import logo from "../imagenes/logotipo renta.png";
import "./nav.css";

export function Nav(estado) {
  const estadoActual = estado.estado;
  const setEstado = estado.set;
  console.log("ESTADO NAV", estadoActual);
  return (
    <nav className="navbar navbar-dark bg-dark" id="nav2">
      <a className="navbar-brand" href="" id="nav-bar-nombre"></a>
      <a href="/" id="linkHome">
        <img src={logo} id="imagen-nav" alt="" />
      </a>

      <div id="menu">
        {/*<button
            onClick={() => setEstado(!estadoActual)}
            type="button"
            className="btn btn-primary"
            id="menu-Desplegable"
          >
            Paginas
  </button>*/}

        <button
          onClick={() => setEstado(!estadoActual)}
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="menu-Desplegable"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}
