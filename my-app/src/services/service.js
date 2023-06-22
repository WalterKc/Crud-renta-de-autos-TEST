/*
import { cargarPokemon, obtenerPokemones } from "../api/api.js";
import { mapearPokemon } from "../mapeador/maper.js";
import { obtenerObjetoLocalStorage } from "../storage/controlador.js";
import { guardarObjetoLocalStorage } from "../storage/controlador.js";
*/
//
import {
  estadoDeLogin,
  obtenerAutosAPI,
  verificoSeccionAPI,
} from "../selector api/api.js";
import { obtenerDatosAPI } from "../selector api/api.js";
import { estadoDeRegistro } from "../selector api/api.js";
import { obtenerUrlsIMG } from "../selector api/api.js";
import { obtenerUrlsIMGV2 } from "../selector api/api.js";
import { enviarDatosSeccion } from "../selector api/api.js";
import { setCookie } from "../selector api/api.js";
import Cookies from "js-cookie";
import { eliminoSeccionApi } from "../selector api/api.js";

//import { obtenerNombresIMGs } from "../selector api/api.js";
//sin funcion por ahora, solo de test
export async function obtenerDatosIniciales() {
  const datos = await obtenerDatosAPI();
  return datos;
}
export async function servicioLogin(cuenta, email, contraseña) {
  //alert("MENSAJE DE LOGIN ENVIADO");

  let respuesta = await estadoDeLogin(cuenta, email, contraseña);
  return respuesta;

  //
}
export async function servicioRegistro(
  cuenta,
  email,
  contraseña,
  nombre,
  telefono
) {
  const respuesta = await estadoDeRegistro(
    cuenta,
    email,
    contraseña,
    nombre,
    telefono
  );
  return respuesta;

  //
}

export async function envioUrlsImgs() {
  //const urls = await obtenerUrlsIMG(await obtenerNombresIMGs());
  const urls = await obtenerUrlsIMGV2();
  return urls;
  //
}

export async function crearSeccion(usuario, rol, email, cookieApp) {
  if (document.cookie.length === 0) {
    console.log(" COOKIE INTERNA", cookieApp);
    //logTest(await testCoockie(" jose", " admin"));
    const seccion = await enviarDatosSeccion(usuario, rol, email);
    return seccion;
  } else {
    //logTest(await testCoockie(" jose", " admin"));
    console.log(" YA TENEMOS UNA COOKIE", cookieApp);
  }
}
//esta funcion de aca, ya no se va a usar, por que hay un metodo mas nuevo y facil
//FUNCION CON ERROR; NO SE USA; PERO SE DEJA
export async function traerCookieV2(cookieApp, setCookieAPP) {
  if (document.cookie.length > 0) {
    console.log(" YA TENEMOS UNA COOKIE", cookieApp);
    //
  } else {
    await setCookie();
    const cookies = document.cookie;
    const cookieBruta = decodeURIComponent(cookies);
    const cookiePares = cookieBruta.split("j:");
    //const valoresCookie = JSON.parse(cookiePares[1]);
    console.log("valoresCookie", cookiePares);
    //setCookieAPP(valoresCookie);
    //
  }
}
//OK, funcion de apoyo
function crearCookie(nombre, datosSinCodificar, tiempoDeVida) {
  const datos = JSON.stringify(datosSinCodificar);

  Cookies.set(nombre, "j:" + datos, { expires: tiempoDeVida });
}
//
//OK
export async function crearSeccionYcookie(
  cookieApp,
  setCookieAPP,
  usuario,
  rol,
  email
) {
  if (document.cookie.length === 0) {
    console.log(" COOKIE INTERNA", cookieApp);
    const datos = await crearSeccion(usuario, rol, email);
    //logTest(datos);
    console.log("DATOS SECCION", datos.datosParaLaCookie);
    crearCookie(
      "UnaCookieEspecial",
      datos.datosParaLaCookie,
      datos.tiempoEstandar
    );
    console.log("tiempo De vida", datos.tiempoEstandar * 1440);
    const cookies = document.cookie;
    const cookieBruta = decodeURIComponent(cookies);
    const cookiePares = cookieBruta.split("j:");
    const valoresCookie = JSON.parse(cookiePares[1]);
    //console.log(valoresCookie);
    setCookieAPP(valoresCookie);
  } else {
    console.log(" YA TENEMOS UNA COOKIE", cookieApp);
  }

  //
}

//OK,
export async function verificarSeccion() {
  const verificacion = await verificoSeccionAPI();
  console.log(verificacion);
  return verificacion;
}

//OK,
export async function eliminarCookieYseccion(setCookieAPP) {
  const eliminoSecion = await eliminoSeccionApi();
  setCookieAPP(false);
  return eliminoSecion;
}
//obtengo autos
export async function obtenerAutos() {
  const datosAutos = await obtenerAutosAPI();
  return datosAutos;
}

//TODAS LAS APIS Y SERVICIOS LISTOS, LISTO PARA INTEGRARLAS A LA APP PRIMARIA
