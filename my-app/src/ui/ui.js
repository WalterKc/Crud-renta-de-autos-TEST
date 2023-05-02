import { obtenerDatosIniciales } from "../services/service";
export async function mostratDatosTest(valor) {
  let contenedorTest = document.querySelector("#TEST");
  contenedorTest.innerHTML = JSON.stringify(valor);
}
