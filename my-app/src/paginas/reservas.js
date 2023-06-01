//vamos a usar esta pagina para hacer test de coockies y secciones, espero que funcione por que ya estoy
//arto
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import {
  traerCookieV1,
  traerCookieV2,
  traerCookieV3,
  verificarSeccion,
  eliminarCookieYseccion,
} from "../services/service";
import { func } from "rsdi";

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
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
async function testCoockieRecibo() {
  const dataInterna = {
    nombre: " nicolas",
  };
  const response = await fetch("http://localhost:8080/cookie", {
    method: "GET",
    //body: JSON.stringify(dataInterna),
    credentials: "include",
    /*
    headers: {
      "Content-Type": "application/json",
    },
    */
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
async function testsincronia() {
  const dataInterna = {
    cookie: document.cookie,
  };
  const response = await fetch("http://192.168.0.3:8080/seccionesTestCookie", {
    method: "POST",
    //body: JSON.stringify(dataInterna),
    credentials: "same-origin",
    "Set-Cookie": document.cookie,

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),

    /*
    headers: {
      "Content-Type": "application/json",
    },
    */
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
async function testsEliminoCookieServer() {
  const dataInterna = {
    cookie: document.cookie,
  };
  const response = await fetch("http://192.168.0.3:8080/eliminoSeccion", {
    method: "POST",
    //body: JSON.stringify(dataInterna),
    credentials: "same-origin",
    "Set-Cookie": document.cookie,

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),

    /*
    headers: {
      "Content-Type": "application/json",
    },
    */
  });
  const result = await response.json();
  //console.log(result);
  return result;
}

async function logTest(mensaje) {
  console.log(mensaje);
}
function cookieFrontTest() {
  Cookies.set("cookieFront", "ValorDELACOOKIE", { expires: 1 / 1440 });
}
function cookieFrontTestV2(nombre, datosSinCodificar, tiempoDeVida) {
  const datos = JSON.stringify(datosSinCodificar);

  Cookies.set(nombre, "j:" + datos, { expires: tiempoDeVida });
}
/**
 * TODAS LAS FUNCIONALIDADES FUNCIONAN AL 100%, pero, falta un poco mas de trabajo, poquito
 * lo que tenemos que hacer es lo siguiente
 * primero, en el front (aca), tenemos que vincular por el tiempo, y limitar que solo halla 1(una)
 * cookie guardada(en el estado),esta cookie, va a estar sincronizada con la sesion del server(node) *LISTO*
 * es automatico casi, no hay que hacer nada casi :) (error?)
 * ahora lo que tenemos que hacer es un limitador aca, que si, existe la cookie, no permitir enviar señales
 * para pedir una nueva *LISTO*
 * ahora, vamos a eliminar esta cookie, del lado del front
 * para hacer esto, hay que capturar el nombre de el cookie y darle una fecha vieja, y ya
 * pero, hay que usar un nombre facil de recordad/fijo, asi que cuando cambiemos el nombre de la cookie
 * tambien tenemos que cambiarlo aqui, nombre temporal (Otracookie=)
 * vamos a testear esto en la app principal, con un estado que se pasa
 *
 * listo, ahora vamos a ir al back, alli tenemos que hacer varias cosas
 * la primera, verificar que existe la cookie, como ya estan sincronizados, solo hay que hacer un
 * select de la id que nos manda el front por medio de un get(que es lo mas facil) *LISTO*
 * ahora tengo que hacer la sincronia de salir de la cuenta*LISTO*, y luego los automaticos de la app
 * (que es usar las señales true false que nos manda el server)
 *
 * vamos a explicar lo que hay que hacer, y luego lo llevamos alla
 * primero, ahy que agregar los estados false y true necesarios en el back
 * luego, tenemos que mover casi todas estan funciones a donde pernezcan
 * el login va en el login, junto a la funcion de chequeo(que es una funcion de estado,
 * por usarse en muchos lados)
 * el login va a funcionar como aqui(que ya funciona), primero, revisa si no hay una cookie valida
 * si no hay, hace el login normal, y con los datos del login normal(cuando se validen)
 * creamos las cookie que se envia aqui, en caso contrario de que los datos no sean validos, no
 * tambien, el login tiene que verificar que ya estemos logeados, asi no nos logeamos 2 veces
 *
 * el registro no tiene cambios, mas alla de avisarnos que estamos logeados
 * lo primero que hace la app, es verificar que ya estemos logeados, de la siguiente manera
 * primero, verifica que tenga una cookie en la pagina, si no la tiene, no esta logeado y se acaba
 * pero si la tiene, verifica que esa cookie sea correcta, usando los verifiadores de aqui,
 * si recibe un true como respuesta, esta logeado, y escribe un estado de logeado(esto se puede mejorar
 * con un local storage), y este estado, es el que se va a usar para todos las paginas que los necesiten
 * una vez echo esto, no es necesario volver a hacer esto, hasta que se cierre la pagina(esto puede cambiar)
 * caso contrario , de que la cookie no sea correcta, la borra
 *
 * para deslogearse, hay 2 maneras, pero para simplificar, solo voy a permitir deslogearse por pedirlo
 * EXPLICITAMENTE (osea tocar el boton de deslogeo),
 * o por verificacion de cookie automatica al inicio de la pagina(solo 1)
 * el que va a ser el encargado del deslogeo, va a ser el nav, con un boton de deslogeo, cuando se este logeado
 * POR EL MOMENTO, no vamos a hacer distinciones entre guest o admins
 *
 * creo que es todo por ahora, el resto es css
 *
 */

export function Reservas(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;
  const [cookie, setCookies] = useState();
  const [cookiePura, setCookiePura] = useState(Cookies.get("Otracookie"));
  const [cookieVal, setCookieVal] = useState(null);
  const [tiempo, setTiempo] = useState();
  const [expirado, setExpirado] = useState();
  const cookieApp = estado.cookie;
  const setCookieAPP = estado.setCookie;

  const logA = async () => {
    //traerCookieV1(" jose", " admin", cookieApp);
    //este de aca arriba funciona bien

    if (document.cookie.length === 0) {
      console.log(" COOKIE INTERNA", cookieApp);
      const datos = await testCoockie(" jose", " admin");
      logTest(datos);
    } else {
      //logTest(await testCoockie(" jose", " admin"));
      console.log(" YA TENEMOS UNA COOKIE", cookieApp);
    }
    /*
    console.log(" COOKIE INTERNA", cookies);

    logTest(await testCoockie(" jose", " admin"));
    console.log(" COOKIE INTERNA despues", cookies);
    */
  };
  //logA();
  const test1 = async () => {
    await testCoockie("jose", "admin");
  };
  const test2 = async () => {
    await testCoockieRecibo();
  };
  //test1();
  const testTiempo = async () => {
    setTimeout(() => {
      setExpirado(true);
    }, 30100);
  };

  const logb = async () => {
    //traerCookieV2(cookieApp, setCookieAPP);

    if (document.cookie.length > 0) {
      console.log(" YA TENEMOS UNA COOKIE", cookieApp);
      //
    } else {
      logTest(await testCoockieRecibo());
      const cookies = document.cookie;
      const cookieBruta = decodeURIComponent(cookies);
      const cookiePares = cookieBruta.split("j:");
      const valoresCookie = JSON.parse(cookiePares[1]);
      //console.log(valoresCookie);
      setCookieAPP(valoresCookie);
      //
    }
  };
  const crearCookieEspecial = async () => {
    traerCookieV3(cookieApp, setCookieAPP, "jose", "admin");
    //este de aqui funciona bien :)
    /*
    if (document.cookie.length === 0) {
      console.log(" COOKIE INTERNA", cookieApp);
      const datos = await testCoockie(" jose", " admin");
      logTest(datos);
      console.log("DATOS SECCION", datos.datosParaLaCookie);
      cookieFrontTestV2(
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
      //1-60000
      //1440-86400000
    } else {
      //logTest(await testCoockie(" jose", " admin"));
      console.log(" YA TENEMOS UNA COOKIE", cookieApp);
    }*/
  };
  //
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
  const verCookie = () => {
    const cookieValue = Cookies.get("UnaCookieEspecial");
    console.log("cookie interna", cookieApp);
    console.log("cookie V2", cookieValue);
  };
  const sincroniaTest = async () => {
    //este funciona, mi aplicacion no le gustan las cookies, asi que las mando a la fuerza
    //que se piensa
    verificarSeccion();

    //const sincro = await testsincronia();
    //console.log(sincro);
  };
  const eliminoTest = async () => {
    const eliminoSeccion = await eliminarCookieYseccion(setCookieAPP);
    console.log(eliminoSeccion);
    eliminoCookie();
    /*
    const sincro = await testsEliminoCookieServer();
    setCookieAPP(false);

    console.log(sincro);*/
  };
  /*
  useEffect(() => {
    console.log("ESTAS ES LA COOKIE BEBE", cookieApp);
    console.log("cookies despues de quitarla", cookieApp);
  }, [console.log("algo")]);
  */
  /**
   *
   */
  let algo = setInterval(console.log("intervalo"), 1000);

  /*
  useEffect(() => {
    let cookieValue = Cookies.get("UnaCookieEspecial");

 
    if (cookieValue) {
      console.log("EXISTE UNA COOKIE GUARDADA");
      console.log("Cookie navegador", document.cookie.length);
      alert("tenemos una cookie guardada");

      //testTiempo();
    } else {
      console.log("ANTES", cookieApp);

      eliminoCookie();

      //setCookies();
      console.log("DESPUES", cookieApp);
      alert("NO tenemos una cookie guardada");
      const botonSet = document.querySelector("#botonSet");
      const botonEnvio = document.querySelector("#botonEnvio");
      //document.querySelector("#botonSet").onclick = logA;
      //botonEnvio.onClick = logb;
      console.log("DOCUMENTO COKK", document.cookie);
    }
  })
  */

  /*
  useEffect(() => {
    // Get the cookie value
    const cookieA = Cookies.get("Otracookie");

    // If the cookie value is null, that means the cookie has expired or disappeared
    if (!cookieA) {
      // Perform your desired side effect here, such as calling an API or updating the state
      console.log("Cookie has expired/disappeared, performing side effect");
      return () => {
        // Remove the reference to the cookie to avoid memory leaks
        Cookies.remove("Otracookie");
      };
    } else {
      setCookieVal(cookieA);
    }

    // Update the state variable with the cookie value
  });
*/
  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      {/*<main id="Test">ES NECESARIO CUENTA PARA VER PEDIR RESERVA</main>*/}
      <main>
        <div>
          <button id="botonSet" onClick={async () => logA()}>
            setear coockies
          </button>
          <button id="botonEnvio" onClick={async () => logb()}>
            recibir coockies
          </button>
          <button id="botonEliminar" onClick={() => eliminoCookie()}>
            elimino la coockie
          </button>
          <button id="verCookie" onClick={() => verCookie()}>
            Ver Cookie
          </button>
          <button id="sincronia" onClick={() => sincroniaTest()}>
            sincronia
          </button>
          <button id="eliminoCookieServer" onClick={() => eliminoTest()}>
            Eliminar Cookie del server
          </button>
          <button id="SetCookieReact" onClick={() => crearCookieEspecial()}>
            SetCookieReact
          </button>
          <button id="SetCookieGeneral" onClick={() => eliminoTest()}>
            SetCookieGeneral
          </button>
        </div>
      </main>
    </div>
  );
}
