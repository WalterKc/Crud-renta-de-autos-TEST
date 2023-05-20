export const BASE_URL = "http://localhost:8080";
const urlTest = "http://localhost:8080/TEST_EMAIL";
const datosTest = {
  selector: "Cuentas",
  email: "email@ejemplo2.com",
};

//export const LIMITE_POKEMONES = 20;
export async function obtenerDatosAPI() {
  return (await fetch(BASE_URL)).json();
}

export async function obtenerDatosLoginTest() {
  return (await fetch(urlTest),
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosTest),
  }).json();
}
