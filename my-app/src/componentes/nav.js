import React, { useState } from "react";

import logo from "../imagenes/logotipo renta.png";
import "./nav.css";

export function Nav(estado) {
  const estadoActual = estado.estado;
  const setEstado = estado.set;
  return (
    <nav className="navbar navbar-dark bg-dark" id="nav2">
      <a className="navbar-brand" href="" id="nav-bar-nombre"></a>
      <a href="/" id="linkHome">
        <img src={logo} id="imagen-nav" alt="" />
      </a>

      <div id="menu">
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
