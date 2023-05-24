/*
import { cargarPokemon, obtenerPokemones } from "../api/api.js";
import { mapearPokemon } from "../mapeador/maper.js";
import { obtenerObjetoLocalStorage } from "../storage/controlador.js";
import { guardarObjetoLocalStorage } from "../storage/controlador.js";
*/
//
import { mensajeDeLogin } from "../selector api/api.js";
import { obtenerDatosAPI } from "../selector api/api.js";
import { mensajeDeRegistro } from "../selector api/api.js";
import { obtenerUrlsIMG } from "../selector api/api.js";
import { obtenerUrlsIMGV2 } from "../selector api/api.js";
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
