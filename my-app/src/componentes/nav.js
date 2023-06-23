import React, { useState } from "react";

import logo from "../imagenes/logotipo renta.png";
import "./nav.css";
import { eliminarCookieYseccion } from "../services/service";
/**
 * ok, ahora que tenemos algo mas limpio esto, vamos a hacer lo que falta
 * tenemos que muestre el login, para eso, vamos a hacer 2 cosas
 * primero, vamos a poner la imagen de login(la persona) y las letras de login *LISTO*
 * estas van a tener un link, para cuando NO SE ESTE LOGEADO, se pueda logear
 * //para hacer este de arriba, hay que traer el estado del log, si esta logeado,una cosa, sino otra
 * segundo, cuando se este logeado, este boton se desactivara, y
 * aparecera el nombre de el user y si es admin, que es admin *LISTO*
 * extra, poner el boton de deslogeo(traerlo de las reservas,ya lo tenes hecho :)
 */
export function Nav(estado) {
  const estadoActual = estado.estadoMenuDespleglable;
  const setEstado = estado.setEstadoMenuDesplegable;
  const cookieApp = estado.cookie;
  const setCookieAPP = estado.setCookie;
  //traigo funciones del area de test/juego
  //funcion para eliminar el estado de la cookie
  const eliminoCookie = () => {
    if (cookieApp !== undefined) {
      document.cookie =
        "UnaCookieEspecial  =; expires=Thu, 1 Jan 1970 00:00:00 UTC";
      setCookieAPP(false);
      console.log("cookies despues de quitarla", cookieApp);
    } else {
      console.log(
        "No hay cookie, no se pueden quitar lo que no hay",
        cookieApp
      );
    }
  };
  //funcion para eliminar la seccion
  const eliminoTest = async () => {
    const eliminoSeccion = await eliminarCookieYseccion(setCookieAPP);
    console.log(eliminoSeccion);
    eliminoCookie();
    /*
    const sincro = await testsEliminoCookieServer();
    setCookieAPP(false);

    console.log(sincro);*/
  };
  //termino de traer las funciones del area de test

  const selectorLogin = () => {
    if (cookieApp === false) {
      console.log(" NO esta logeado");
      console.log(" cookieApp", cookieApp);
      return (
        <div id="login">
          <a href="/Login" id="linkLogin">
            <i className="bi-person-circle " id="iconoLogin"></i>
          </a>
          <p id="texto">Login</p>
        </div>
      );
    } else {
      console.log(" esta logeado");
      console.log(" cookieApp", cookieApp);
      return (
        <div id="login">
          <a id="linkLogin">
            <p id="deslogearse">Salir</p>
            <i
              class="bi bi-box-arrow-right"
              id="iconoLogin"
              onClick={async () => [
                console.log("deslogearse", cookieApp),
                eliminoTest(),
              ]}
            ></i>
          </a>
          <p id="texto">{cookieApp.nombre}</p>
        </div>
      );
    }
  };
  return (
    <nav className="navbar navbar-dark bg-dark" id="nav2">
      <a className="navbar-brand" href="" id="nav-bar-nombre"></a>
      <a href="/" id="linkHome">
        <img src={logo} id="imagen-nav" alt="" />
      </a>

      <div id="menu">
        {selectorLogin()}

        <button
          onClick={() => setEstado(!estadoActual)}
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="menu-Desplegable"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}
