//vamos a usar esta pagina para hacer test de coockies y secciones, espero que funcione por que ya estoy
//arto
import { useEffect } from "react";
import { useState } from "react";

const urlcoockie1 = "http://localhost:8080/sessionesV2";
const urlcoockie2 = "http://localhost:8080/sessionesRespuesta";
async function testCoockie(usuario, rol) {
  const dataInterna = {
    usuario: usuario,
    rol: rol,
  };
  //aca tengo que pasar los datos, mas tarde voy a hacer la contraseña
  const response = await fetch(urlcoockie1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
async function testCoockieRecibo() {
  const response = await fetch("http://localhost:8080/cookie-set", {
    credentials: "include",
    "Content-Type": "application/json",
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
async function logTest(mensaje) {
  console.log(mensaje);
}

export function Reservas(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;
  const [cookies, setCookies] = useState();

  const logA = async () => {
    logTest(await testCoockie("jose", "admin"));
  };
  logA();
  const test1 = async () => {
    await testCoockie("jose", "admin");
  };
  const test2 = async () => {
    await testCoockieRecibo();
  };
  //test1();

  const logb = async () => {
    logTest(await testCoockieRecibo());
  };

  useEffect(() => {});

  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      {/*<main id="Test">ES NECESARIO CUENTA PARA VER PEDIR RESERVA</main>*/}
      <main>
        <div>
          <button onClick={async () => logA()}>setear coockies</button>
          <button onClick={async () => logb()}>recibir coockies</button>
        </div>
      </main>
    </div>
  );
}
