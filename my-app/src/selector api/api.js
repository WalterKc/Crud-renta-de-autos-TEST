export const BASE_URL = "http://localhost:8080";
//export const LIMITE_POKEMONES = 20;
export async function obtenerDatosAPI() {
  return (await fetch(BASE_URL)).json();
}
/*
export async function cargarPokemon(id) {
  return (await fetch(BASE_URL + id)).json();
}
*/
