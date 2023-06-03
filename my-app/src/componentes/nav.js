import React, { useState } from "react";

import logo from "../imagenes/logotipo renta.png";
import "./nav.css";
/**
 * ok, ahora que tenemos algo mas limpio esto, vamos a hacer lo que falta
 * tenemos que muestre el login, para eso, vamos a hacer 2 cosas
 * primero, vamos a poner la imagen de login(la persona) y las letras de login
 * estas van a tener un link, para cuando NO SE ESTE LOGEADO, se pueda logear
 * segundo, cuando se este logeado, este boton se desactivara, y
 * aparecera el nombre de el user y si es admin, que es admin
 */
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
        <div id="login">
          <a href="/Login" id="linkLogin">
            <i class="bi-person-circle " id="iconoLogin"></i>
          </a>
          <p id="texto">Login</p>
        </div>

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
