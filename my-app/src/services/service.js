/*
import { cargarPokemon, obtenerPokemones } from "../api/api.js";
import { mapearPokemon } from "../mapeador/maper.js";
import { obtenerObjetoLocalStorage } from "../storage/controlador.js";
import { guardarObjetoLocalStorage } from "../storage/controlador.js";
*/
//
import { mensajeDeLogin, verificoSeccionAPI } from "../selector api/api.js";
import { obtenerDatosAPI } from "../selector api/api.js";
import { mensajeDeRegistro } from "../selector api/api.js";
import { obtenerUrlsIMG } from "../selector api/api.js";
import { obtenerUrlsIMGV2 } from "../selector api/api.js";
import { enviarDatosSeccion } from "../selector api/api.js";
import { setCookie } from "../selector api/api.js";
import Cookies from "js-cookie";
import { eliminoSeccionApi } from "../selector api/api.js";

//import { obtenerNombresIMGs } from "../selector api/api.js";
export async function obtenerDatosIniciales() {
  const datos = await obtenerDatosAPI();
  return datos;
}
export async function servicioTestLogin(cuenta, email, contraseña) {
  //alert("MENSAJE DE LOGIN ENVIADO");

  let respuesta = await mensajeDeLogin(cuenta, email, contraseña);
  return respuesta;

  //
}
export async function servicioTestRegistro(
  cuenta,
  email,
  contraseña,
  nombre,
  telefono
) {
  const respuesta = await mensajeDeRegistro(
    cuenta,
    email,
    contraseña,
    nombre,
    telefono
  );
  return respuesta;

  //
}
export async function servicionTestUrls() {
  //const urls = await obtenerUrlsIMG(await obtenerNombresIMGs());
  const urls = await obtenerUrlsIMG();
  return urls;
  //
}
export async function servicioTestUrlsV2() {
  //const urls = await obtenerUrlsIMG(await obtenerNombresIMGs());
  const urls = await obtenerUrlsIMGV2();
  return urls;
  //
}
//para probar este de aca abajo, tiene que dar el mismo resultado en el area de pruebas, asi que hasta
//que eso no sea verdad, no va a salir de aca
//algo nuevo, este es un modulo, asi que puede estar separado, cuando te logees, va a ser parte
//de una funcion mas grande, asi que esta bien asi sola, no es necesario modificar ni crear nada
//
// aca hay una duda, creo que puedo hacer todo en servicio, pero, no se si vale la pena...

export async function traerCookieV1(usuario, rol, cookieApp) {
  //lo primero que hacemos aca es darle los datos para generar la seccion
  //tambien hay que verificar que, exista la cookie, asi que,vamos a hacerlo aca, y si no funciona
  //va a ser tarea de otra funcion(como esta en el area de test)
  if (document.cookie.length === 0) {
    console.log(" COOKIE INTERNA", cookieApp);
    //logTest(await testCoockie(" jose", " admin"));
    const seccion = await enviarDatosSeccion(usuario, rol);
    return seccion;
  } else {
    //logTest(await testCoockie(" jose", " admin"));
    console.log(" YA TENEMOS UNA COOKIE", cookieApp);
  }
  /*
  console.log(" COOKIE INTERNA", cookies);

  logTest(await testCoockie(" jose", " admin"));
  console.log(" COOKIE INTERNA despues", cookies);
  */

  //
}
//esta funcion de aca, ya no se va a usar, por que hay un metodo mas nuevo y facil
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
function crearCookie(nombre, datosSinCodificar, tiempoDeVida) {
  const datos = JSON.stringify(datosSinCodificar);

  Cookies.set(nombre, "j:" + datos, { expires: tiempoDeVida });
}
export async function traerCookieV3(cookieApp, setCookieAPP, usuario, rol) {
  if (document.cookie.length === 0) {
    console.log(" COOKIE INTERNA", cookieApp);
    const datos = await traerCookieV1(usuario, rol);
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
export async function verificarSeccion() {
  const verificacion = await verificoSeccionAPI();
  console.log(verificacion);
  return verificacion;
}
//esto tiene que ser de ambos? o solo 1 cosa?
//mmm
//vamos a explicar como tiene que funcionar esto primero
/**
 * esto tiene que eliminar la seccion y el login, cuando?, cuando pasen 2 cosas, 1, el usuario toca
 * el boton de deslogearse, y otra, cuando la cookie halla muerto, si la cookie muere/desaparece/no es valida
 * se deslogea automaticamente,
 * pero, ya temenos la verificacion completa, asi que no es necesario hacerla, solo integrarla
 * mmm, vamos a hacer 2 y ya
 */
//cualquier cosa que no toque la api, no va aca, son funciones de apoyo que van en otro lado

export async function eliminarCookieYseccion(setCookieAPP) {
  const eliminoSecion = await eliminoSeccionApi();
  setCookieAPP(false);
  return eliminoSecion;

  //si no existe la cookie, elimino la secion/ (no hay seccion si no hay cookie, asi que no es valido)
  //si la cookie no pasa la comprobacion, elimino la seccion/ (si la cookie no pasa, no hay seccion)
  //pero, no se si vale la pena hacerlo interno... creo que no
  //esta comprobacion, es externa, no es necesaria, el servicion solo se encarga de hacer pedidos a la
  //api del server, nada mas
  /*
  console.log(eliminoSecion);
  if (cookieApp !== undefined) {
    document.cookie =
      "UnaCookieEspecial  =; expires=Thu, 1 Jan 1970 00:00:00 UTC";
    setCookieAPP(false);
    console.log("cookies despues de quitarla", cookieApp);
  } else {
    console.log("No hay cookie, no se pueden quitar lo que no hay", cookieApp);
  }*/

  //
}
//TODAL LAS APIS Y SERVICIOS LISTOS, LISTO PARA INTEGRARLAS A LA APP PRIMARIA

/*
export async function obtenerPagina(pagina) {
  if (obtenerObjetoLocalStorage("Pagina " + pagina) !== null) {
    return obtenerObjetoLocalStorage("Pagina " + pagina);
  } else {
    const pokemones = await obtenerPokemones(pagina);
    guardarObjetoLocalStorage(pokemones.results, "Pagina " + pagina);
    return pokemones.results;
  }
}
export async function obtenerNumeroPaginas() {
  const numero = await obtenerPokemones();
  return numero.count;
}

export async function obtenerPokemon(nombre) {
  if (obtenerObjetoLocalStorage(nombre) !== null) {
    return obtenerObjetoLocalStorage(nombre);
  } else {
    const pokemon = await cargarPokemon(nombre);
    mapearPokemon(pokemon);

    guardarObjetoLocalStorage(
      mapearPokemon(pokemon),
      mapearPokemon(pokemon).name
    );

    return pokemon;
  }
}
*/
