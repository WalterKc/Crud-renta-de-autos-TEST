/*
import { cargarPokemon, obtenerPokemones } from "../api/api.js";
import { mapearPokemon } from "../mapeador/maper.js";
import { obtenerObjetoLocalStorage } from "../storage/controlador.js";
import { guardarObjetoLocalStorage } from "../storage/controlador.js";
*/
//
import { obtenerDatosAPI } from "../selector api/api.js";
export async function obtenerDatosIniciales() {
  const datos = await obtenerDatosAPI();
  return datos;
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
