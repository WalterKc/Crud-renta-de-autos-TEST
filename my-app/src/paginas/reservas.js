//vamos a usar esta pagina para hacer test de coockies y secciones, espero que funcione por que ya estoy
//arto
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import {
  crearSeccion,
  traerCookieV2,
  crearSeccionYcookie,
  verificarSeccion,
  eliminarCookieYseccion,
} from "../services/service";

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

/**
 * aca vamos a practicar lo de los cuadros de imagenes cuando se hacen click y vamos a pasarle los datos
 * requeridos, luego, una vez completos aca, vamos a exportarlos, como hicimos con el con las otras
 * funciones
 *
 * OK,ya tenemos 1 funcional, ignoremos el css por ahora,
 * ahora lo que vamos a hacer es simple, primero, vamos a traer todos los datos de los autos del servidor
 * y enviarlos ordenadamente, luego, vamos a traer aca un slider , el mas chico, y vamos a hacer que
 * muestre estos datos correctamente, eso es todo
 * como hacemos esto?, primero, vamos a hacer que , cuando se toque el slider, se abra el modal
 */
//traigo los autos desde el server, TODOS

async function obtengoAutos() {
  const response = await fetch("http://192.168.0.3:8080/Autos", {
    method: "Get",
    //body: JSON.stringify(dataInterna),
    headers: {
      "Content-Type": "application/json",
    },

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
  const [arrayAutos, setArrayAutos] = useState();
  const sliderdeTest = estado.sliderVans;
  const sliderdeTest2 = estado.sliderPremiun;

  const estadoSliders = estado.sliderGeneralEstado;
  const estadoBotones = estado.estadoBotones;
  const imagenesOrdenadas = estado.imagenesOrdenadas;

  const logA = async () => {
    //crearSeccion(" jose", " admin", cookieApp);
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
    crearSeccionYcookie(cookieApp, setCookieAPP, "jose", "admin");
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
  const [autoActual, setAutoActual] = useState();
  const [autoActualV2, setAutoActualV2] = useState();
  const [datosAutos, setDatosAutos] = useState();

  const autos = async () => {
    const autos = await obtengoAutos();
    console.log("ESTOS SON LOS AUTOS", autos.Vans[0]);

    /*return {
      Marca: autos.vans[0].Marca,
      Modelo: autos.vans[0].Modelo,
      Año: autos.vans[0].Año,
      Kms: autos.vans[0].Kms,
      Color: autos.vans[0].Color,
      Aire_acondicionado: autos.vans[0].Aire_acondicionado,
      Pasajeros: autos.vans[0].Pasajeros,
      trasmision: autos.vans[0].trasmision,
      Tipo: autos.vans[0].Tipo,
    };*/
    setAutoActual([Object.keys(autos.Vans[1]), Object.values(autos.Vans[1])]);
    setAutoActualV2([autos.Vans]);
    setDatosAutos([autos]);

    //return [Object.keys(autos.vans[0]), Object.values(autos.vans[0])];
  };
  //autos();
  const unModal = document.querySelector("#modal");

  //imagenes();
  const modalCambiante = () => {
    //const valores = Object.values(await autos());
    //const keys = Object.keys(await autos());
    //console.log("VALORES ", datos);
    //console.log("VALUES de json", valores);
    //console.log("tamaño de json", valores.length);

    console.log("SoyUnmodal");
    //console.log("Keys de json", autoActual[0]);
    //console.log("tamaño de json", autoActual[1].length);
    let mensaje = "un mensaje";

    if (autoActual === undefined) {
      mensaje = "un mensaje";
    } else {
      mensaje = autoActual[0][1];
    }

    return (
      <div className="container">
        <dialog id="modal">
          {/*<p>{`${autoActual[0][1]}:${autoActual[1][1]}`}</p>*/}
          <p> {mensaje}</p>
          <form method="dialog">
            <button>OK</button>
          </form>
        </dialog>
      </div>
    );
  };

  /// bueno bueno bueno, este funciona, mas o menos, pero funciona
  //pero le falta trabajo, aca vamos a escribir lo que le haga falta
  //ok, NO HAY QUE METER NINGUNA promesa asi nomas en dentro de algo que se renderiza directamente en la pagina
  // por que , entra en un bucle, y mata el rendimiento
  //y no se llega a nada, los datos que se requieran de la api, tiene que estar ya procesados en alguna otra funcion

  const modalCambianteV2 = () => {
    if (autoActual === undefined) {
      return (
        <div className="container">
          <dialog id="modal">
            <p> NO HAY AUTO</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>
        </div>
      );
    } else {
      return (
        <div className="container">
          <dialog id="modal">
            <p> {`${autoActual[0][1]}:${autoActual[1][1]}`}</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>
        </div>
      );
    }
  };

  //modalCambiante();
  /*

  useEffect(() => {
    autos();
  }, [estadoSliders]);
*/
  /*
  useEffect(() => {
    const imagenes = async () => {
      //aca tengo que hacer "Rotar" el array de datos de vans, y sincronizarlo con cada 1,
      const imagenSlider = document.querySelectorAll(".seccion-slider"); //la imagen 1 es la principal siempre

      console.log("SLIDERS ", imagenSlider[1]);
      //unModal.showModal()
      //setAutoActual("un auto");
      console.log("DATOS AUTOS", autoActual);
      console.log("DATOS AUTOS V2", autoActualV2[0][1]);
      console.log("TODOS LOS DATOS JUNTOS", datosAutos);
      console.log("TODOS LOS DATOS JUNTOS TIPOS", datosAutos[0]);

      //imagenSlider[1].addEventListener("click", () => unModal.showModal());
    };
    imagenes();
    const rotoDatos = async () => {
      //idea, cuando se toque el boton derecha/izquierda, el array de datos rote de la misma forma que rotan las imagenes
      //a esto primero lo vamos a hacer con un array falso, y luego con el real
      const derecha = document.querySelector("#derecha");
      const izquierda = document.querySelector("#izquierda");

      //hay que mostrar siempre el elemento [1] , y hay que girar el resto desuyo
      //primero, hay que selecionar el array(el de abajo)
      //luego hay que quitar el ultimo o primer elemento del array, y ponerlo en el otro lugar,
      //dependiendo de hacia donde se mueva

      let arrayTest = [0, 1, 2, 3, 4, 5];
      console.log("array antes", arrayTest[1]);
      //se toca un boton derecha, se saca primer elemento, y se lo pone al final
      //esto se hace con un shif
      //console.log("array shif", arrayTest.shift());
      let shift = arrayTest.shift();
      //se mete este shift al final con un push
      arrayTest.push(shift);
      //arrayTest.insertAdjacentElement("beforeend", arrayTest[0]);
      console.log("array despues", arrayTest[1]);
      console.log("array despues", arrayTest);
      //tocamos el boton izquierda, temenos que hacer lo contrario, con un pop()
      let pop = arrayTest.pop();
      //se mete este pop al principio  con un unshift
      arrayTest.unshift(pop);
      console.log("array despues", arrayTest[1]);
      console.log("array despues", arrayTest);
      //listo
      console.log("DATOS AUTOS entero", autoActualV2[0]);
      //hacemos lo mismo con esto
      let map = await autoActualV2[0];
      console.log("MAP ORIGINAL", map);
      //let shift2 = map.shift();
      //map.push(shift2);
      //console.log("MAP", map);
      //ahora vamos a probarlo con botones reales, sin shit ni nada
    };
    rotoDatos();
  }, [estadoSliders]);
  */
  //este funciona perfecto, bueno, ahora vamos a escribir lo que tenemos que hacer de verdad

  const rotoDatosV2 = async (boton) => {
    let map = await autoActualV2[0];
    console.log("ANTERIOR MAP", map);
    const derecha = document.querySelector("#derechaTEST");
    const izquierda = document.querySelector("#izquierdaTEST");
    if (boton === "derecha") {
      let shift = map.shift();
      map.push(shift);
      console.log("MAP", map);

      //
    } else if (boton === "izquierda") {
      console.log("ANTERIOR MAP", map);

      let pop = map.pop();
      map.unshift(pop);
      console.log("MAP", map);

      //
    }
  };
  /**
   * primero, los datos, los datos entran bien, y son controlable, pero, no hay que modificarlos ni nada, solo leerlos,
   * el array rotante, es array copia interno, mas que nada, asi no llamo al servidor al pedo, ni toco nada
   * hay que selecionar cada boton derecha y izquierda por separado, por cada slidergeneral, pero hay un problema, no hay manera
   * de selecionar cada 1 a la vez, a menos que les ponga un id especial, o se integrel slider, o de otra manera
   * pero, no quiero modificar el slider, por que ya esta muy bien asi y esto es algo que no le corresponde
   * asi que, voy a tener que ser alguna de las otras 2 cosas
   * luego de poder selecionar esto, hay que hacer una funcion de proposito general,para cualquier slider
   * asi que, vamos a tener que sacar algun dato del slider, o se tiene que enviar un dato o algo, asi funcione para cualquier
   * slider y cualquier tamaño del mismo
   * para hacer esto vamos a hacer lo siguiente
   * primero, traemos todos los datos de los autos, solo los autos,este va a ser el que diga/decida cuales son las los sliders que
   * tienen datos, ya que, siempre van a ser los mismos que los sliders a mostrar(y companten id)
   * luego, tenemos que apartar estas id/keys,las vamos a usar
   * luego, hay que crear los onclick, esto se van a hacer todos juntos, luego y solo cuando se cargen los sliders, por que sino
   * va a dar error, asi que , hay que crear estos onclick luego de que se cargen las imagenes, estas solo se van a cargar 1
   * vez por reload, asi que no vamos a entrar en bucle
   * //vamos a hacer una prueba primero, vamos a ver si se puede crear un onclick "flotante" que mande console logs, 1 x cada boton(der/izq)
   */
  const [contador, setContador] = useState(0);
  const [evento, setEvento] = useState(false);
  const [CARGA, setCARGA] = useState(false);
  const [unaVez, setUnaVez] = useState(false);

  const funcionDETEST = () => {
    if (estadoBotones) {
      setEvento(true);
    } else {
      setEvento(false);
    }
  };
  useEffect(() => {
    funcionDETEST();
    console.log("CARGA INICAL", evento);
  }, [estadoBotones]);
  //hace falta dividir esto, si o si
  useEffect(() => {
    console.log("CARGADO");
    const cargarAutos = async () => {
      await autos();
    };
    cargarAutos();

    setCARGA(true);
  }, [imagenesOrdenadas]);
  //
  const controladorDeDatosYModalsGeneralTest = async (estadoBoton) => {
    //console.log("ESTADO BONOTES", estadoBotones);

    //await autos();
    //ya tenemos los datos cargados, no hay que cargarlos
    //console.log("CARGA INICAL", evento);

    console.log("DATOS PUROS A PELO", datosAutos);

    console.log("TODOS LOS DATOS DE LOS AUTOS x TIPOS", datosAutos[0]);
    const keys = Object.keys(datosAutos[0]);
    //creamos los onclick solo despues de que se cargen las imagenes
    const derecha = document.querySelector("#derecha");
    const izquierda = document.querySelector("#izquierda");

    //const onclicks = () => {
    let onclickDerecha = [];
    let onclickIzquierda = [];

    for (let x = 0; x < keys.length; x++) {
      //creamos los onclick
      onclickDerecha[x] = document.querySelector(`#derecha${keys[x]}`);
      onclickIzquierda[x] = document.querySelector(`#izquierda${keys[x]}`);
    }
    console.log(
      "clicks derecha",
      onclickDerecha,
      "clicks izquierda",
      onclickIzquierda
    );
    //return [onclickIzquierda, onclickDerecha];
    //};
    //const botones = onclicks();
    //selecionamos un boton y le damos un valor onclick
    //bueno, hasta aca funciona, pero, no es lo que se requiere, esto tiene que ser un selecotor automatico, y hasta
    //que no sea automatico, no va a funcionar, pero, como lo haremos?,mmm hay que pensar un poco,
    //que es lo que tengo?, un array con los botones, los datos, y los listener, y tengo que selecionar desde esos array, lo que quiero
    //se me ocurre un for con un if else, que valla verificando que se toco, 1x1, pero, eso consume muchos recursos creo

    onclickDerecha[4].addEventListener("click", () =>
      console.log("SOY UN BOTON DERECHA DERECHA DERECHA")
    );
    let botonIZQ = document.querySelector("#izquierdaVans");
    botonIZQ.addEventListener("click", (e) =>
      console.log("SOY UN BOTON botonIZQ botonIZQ botonIZQ", e.target)
    );
    let todosLosBotones = document.querySelectorAll(".slider-boton");
    console.log("TODOS LOS BOTONES", todosLosBotones);
    //let encuentroALGO = todosLosBotones.find((elemento) => elemento.id === "izquierdaVans");
    //el NODELIST, no es un array, pero con esto se puede usar como uno
    const encuentroALGOV2 = Array.from(todosLosBotones).find(
      (node) => node.id === "derechaaVans"
    );
    let arrayTest = [0, 1, 2, 3, 4, 5, 6];

    const encuentroALGOV3a = onclickDerecha.filter((boton) => boton !== null);
    console.log("encuentroALGOV3a", encuentroALGOV3a);

    //este es el factor limitante, si no existe este, no se sigue
    //acordate que solo es necesario encontrar un boton, no los 2
    const encuentroALGOV3b = Array.from(todosLosBotones).find(
      (node) => node !== "derechaaVans"
    );
    //si el de arriba existe, se continua, sino no
    /**
     * encontramos todos los botones, y buscamos si existen en el array derecho
     * si existen, se crea una evento
     * si es undefined, no se hace nada
     *
     */
    //ok, esto ya funciona bien y injecta funciones y devuelven lo que quiero , ahora, tengo que hacer que rote los datos
    /**
     * vamos a explicar lo que hay que hacer, que es mas facil que mirar al aire sin hacer nada, dale ,que ya terminas
     * esto de abajo, funciona, y no hay mucho que explicar, pero tenemos que integrar la rotacion de los datos aca,
     * ya que estos van a ser, los datos que el modal va a leer, asi que vamos a explicar como hacemos esto
     * aver si se me ocurre alguna forma de integrarlo de manera eficiente
     * primero, funcion de comparacion, ya verifica y selecionas los clicks, asi que no es necesario verificar nada, a es hay que
     * quitarlo, luego hay que asignar , a cada grupo de botones, sus datos, y tiene que ser automatico, asumo que hay que
     * pasarle datos/flags, o algo, para indicarle a rotacion que tiene que rotar
     *
     */
    /**
     * DESPUES DE MUCHO MUCHO DOLOR, ES PROGRAMA YA ESTA LISTO PARA ROTAR LOS ARRAY, AHORA, HAY QUE HACER UN SELECTOR AUTOMATICO
     * (CON LO QUE YA PREPARAMOS DE ANTEMANO ;) Y HACER EL MODAL, LUEGO LO HACEMOS UNA FUNCION IDEPENDIENTE, CON UN NOMBRE
     * POTENTE Y YA , FIN, SE ACABO, FINITO, PERO, PRIMERO VAMOS A DESCANSAR UN POCO, LLEVO CASI 12 HORAS
     *
     * iniciamos la selecion los datos automaticos(y el boton derecha tambien)
     * primero, vamos a hacer el selector automatico, bueno, ehh, como esto el algo confuso, vamos a usar lo que ya habiamos preparado
     * anteriormente, el selector de array, vamos a jugar un poco con el y cuando este listo, esplico lo que hay que hacer
     * Problema de los multiples click solucionados, para que MIERDA vamos a queres hacer un evento variable supercomplejo, si directamente
     * borramos el boton y nadie puede tocarlo, asi de simple, sin boton, nadie lo toca, y se evita el error de el pasarse
     * LISTO!
     * explicacion >-x
     * la funcion de rotar datos funciona de una manera simple, la funcion de comparacion, crea los eventos, y SIEMPRE ESTAN ACTIVOs
     * pero, como eliminamos los botones, solo se tocan una vez, una vez tocado elboton,inicia la funcion que hace lo siguiente
     * primero creamos los estados pasado y presente de todas las imagenes, estas son idependiente x cada 1, asi que no hay problemas
     * luego, si el estado esta true(que es cuando el boton se toca), actualizamos el estado actual, y creamos los selectores
     * de los arrays (mapV2 y selecion general), luego, comparamos los estado pasado y actual, con el corrimiento del array
     * si todo esta correcto y bien, son iguales, y si son iguales, se prosigue con la rotacion, si se toca el boton izquierda o derecha
     * luego , en cada uno de estos 2 se hace los siguiente, si es izquierda, se quita el ultimo elemento del array selecionado
     * con los selectore, y se lo pone al principio, y si es derecha, se hace lo contrario, se saca el primero y se lo pone al final
     * eso es todo, FIN EXPLICACION <-x
     * hora de llenar los datos de los modales con esto, darle un nombre final sacarlo de aca
     *
     *
     *
     */

    const rotoDatosV3 = async (boton, estadoBoton) => {
      const cosa = document.querySelectorAll("#slider-MainVans");
      let actual = cosa[0].childNodes;
      let pasado = cosa[0].childNodes;

      if (estadoBoton) {
        actual = cosa[0].childNodes;

        console.log("ESTAN ACTIVOS R", actual[1], arrayTest);
        let selecion3 = "Vans";
        let selecionGeneral = "";
        //let cosa = document.querySelectorAll("#slider-MainVans");

        let map = await autoActualV2[0];
        //este es que hay que selecionar
        let mapV2 = await datosAutos;
        let mapV3 = await datosAutos[0][selecion3];
        let rotoVansTest = datosAutos[0].Vans;
        //let mapaDeDatos=await datosAutos[0][selecionGeneral]
        //console.log("ESTE ES EL ARRAY QUE HAY QUE ROTAR V2", mapV3);
        console.log("cosa CUENTA 2");

        if (boton.id.search("izquierda") >= 0) {
          console.log(
            "ES VERDAD izquierda",
            boton.id,
            boton.id.split("izquierda")[1]
          );
          let seleccion = boton.id.split("izquierda")[1];
          let selecion2 = JSON.parse('{"nombre":"Vans"}');
          selecionGeneral = boton.id.split("izquierda")[1];
          //let selecion3 = selecion2.split(" ");
          //var selector4 = mapV2[0].selecion2.nombre;

          console.log(
            "ESTE ES EL ARRAY QUE HAY QUE ROTAR",
            selecion2.nombre,
            boton.id.split("izquierda")[1],
            mapV2[0][selecionGeneral]
          );
          //console.log("cosa", cosa2);
          let cosa3 = cosa[0].childNodes;
          console.log("cosa3", cosa3);
          console.log("cosa ESTADO", estado);
          console.log("cosa CUENTA");
          //ESTA AL REVEZ!

          if (actual[1].childNodes[0].src === pasado[1].childNodes[0].src) {
            //botonActivo = !estadoBoton;

            //console.log("LA COSA EXISTE", cosa3[1]);
            console.log("array ORIGINAL", mapV2[0][selecionGeneral]);
            //console.log("array TEST", arrayTest);

            //console.log("LA COSA EXISTE");
            //let shift = rotoVansTest.shift();
            console.log("array antes", mapV2[0][selecionGeneral][1]);
            //let shiftV2 = arrayTest.shift();
            let popV2 = mapV2[0][selecionGeneral].pop();

            //se mete este shift al final con un push
            //rotoVansTest.push(shift);
            //arrayTest.push(shiftV2);
            mapV2[0][selecionGeneral].unshift(popV2);

            //arrayTest.insertAdjacentElement("beforeend", arrayTest[0]);
            console.log("array despues", mapV2[0][selecionGeneral][1]);
            //tocamos el boton izquierda, temenos que hacer lo contrario, con un pop()
            //let pop = rotoVansTest.pop();
            //se mete este pop al principio  con un unshift
            //rotoVansTest.unshift(pop);
            //console.log("array despues", rotoVansTest);
          } else {
            //console.log("LA COSA NO EXISTE",  cosa3[1], cosa2[1]);
            console.log("LA COSA NO EXISTE");
          }
        } else if (boton.id.search("derecha") >= 0) {
          console.log(
            "ES VERDAD derecha",
            boton.id,
            boton.id.split("derecha")[1]
          );
          selecionGeneral = boton.id.split("derecha")[1];

          if (actual[1].childNodes[0].src === pasado[1].childNodes[0].src) {
            console.log("LA COSA EXISTE");
            console.log("array ORIGINAL", mapV2[0][selecionGeneral]);
            console.log("array PROPIO", arrayTest);

            //console.log("LA COSA EXISTE");
            //let shift = rotoVansTest.shift();
            //se mete este shift al final con un push
            //rotoVansTest.push(shift);
            //arrayTest.insertAdjacentElement("beforeend", arrayTest[0]);
            console.log("array antes", mapV2[0][selecionGeneral][1]);
            //tocamos el boton izquierda, temenos que hacer lo contrario, con un pop()
            //let pop = rotoVansTest.pop();
            let shiftV2 = mapV2[0][selecionGeneral].shift();
            //let popV2 = mapV2[0][selecionGeneral].pop();
            //se mete este pop al principio  con un unshift
            //rotoVansTest.unshift(pop);
            //mapV2[0][selecionGeneral].unshift(popV2);
            mapV2[0][selecionGeneral].push(shiftV2);
            console.log("array despues", mapV2[0][selecionGeneral][1]);
          } else {
            //console.log("LA COSA NO EXISTE",  cosa3[1], cosa2[1]);
            console.log("LA COSA NO EXISTE");
          }
        } else {
          console.log("LA COSA NO EXISTE o el boton es false");
        }
        //console.log("DATOS SELECIONADOS", boton.id.split("izquierda"));
        //estos 2 de abajo estan obsoletos, ya no son necesarios
        /*
      const derecha = document.querySelector("#derechaTEST");
      const izquierda = document.querySelector("#izquierdaTEST");
      */
        //escondo esto por el momento
        /*
      if (boton === "derecha") {
        let shift = map.shift();
        map.push(shift);
        console.log("MAP", map);

        //
      } else if (boton === "izquierda") {
        console.log("ANTERIOR MAP", map);

        let pop = map.pop();
        map.unshift(pop);
        console.log("MAP", map);

        //
      }
      */
      } else {
        pasado = cosa[0].childNodes;

        console.log("NO ESTAN ACTIVOS R", pasado[1].childNodes[0].src);
      }
    };

    const funcionComparacionV2 = (onclickCreados) => {
      const cosa0 = document.querySelectorAll("#slider-MainVans");
      const cosa1 = cosa0[0].childNodes;
      console.log("cosa1", cosa1);
      let eventos = [];

      let estadoEspecial = false;
      /*
      if (estadoBotones) {
        console.log("ESTAN ACTIVOS");
        estadoEspecial = true;
      } else {
        console.log("NO ESTAN ACTIVOS");
        estadoEspecial = false;
      }
      */

      for (let x = 0; x < todosLosBotones.length; x = x + 2) {
        //console.log("TABLA DEL 2", x);
        //console.log("NODE ARRAY", todosLosBotones[x]);
        if (
          todosLosBotones[x] ===
            onclickDerecha.find((boton) => boton === todosLosBotones[x]) &&
          onclickCreados === false
        ) {
          //si existe(y existe), creamo un evento, uno simple para empezar, solo un console log
          console.log(
            "FFFF, que funcion mas rebuscada, pero exite",
            x,
            x + 1,
            todosLosBotones[x]
          );
          console.log(
            "EL CLICK EN SI",
            todosLosBotones[x],
            todosLosBotones[x + 1]
          );

          todosLosBotones[x].addEventListener("click", (e) => [
            console.log("SOY UN BOTON cualquiera", e.target),
            rotoDatosV3(e.target, estadoBoton),
          ]);

          todosLosBotones[x + 1].addEventListener("click", (e) => [
            console.log("SOY UN BOTON cualquiera", e.target),
            rotoDatosV3(e.target, estadoBoton),
          ]);
          //este de aca no es necesario, ya no es extraña
        } /*else if (onclickCreados) {
          if (
            todosLosBotones[x] ===
            onclickDerecha.find((boton) => boton === todosLosBotones[x])
          ) {
            console.log(
              "FFFF, que funcion mas rebuscada, pero exite V2",
              x,
              x + 1,
              todosLosBotones[x],
              onclickDerecha.find((boton) => boton === todosLosBotones[x])
            );
            todosLosBotones[x].removeEventListener("click", (e) => [
              console.log("SOY UN BOTON cualquiera", e.target),
              rotoDatosV3(e.target, estadoBoton),
            ]); //¡¡¡¡ ??? no entiendo por que esto funciona, pero es asi, un golpe de suerte ,PREGUNTAR
            todosLosBotones[x + 1].removeEventListener("click", (e) => [
              console.log("SOY UN BOTON cualquiera", e.target),
              rotoDatosV3(e.target, estadoBoton),
            ]);
          } else {
            console.log("nada");
          }
        }*/ else {
          console.log("ALGO HICEM MAL SEGURO; NO EXISTE");
        }
      }
    };
    if (unaVez === false) {
      if (estadoBoton) {
        funcionComparacionV2(unaVez);
        console.log("estadoBoton", estadoBoton);
        setUnaVez(true);
      } else {
        console.log("nada");
        //rotoDatosV3("", estadoBoton);
        console.log("estadoBoton", estadoBoton);
      }
      console.log("UNAVEZ");
      console.log("estadoBoton", estadoBoton);
    } else {
      console.log("NO UNAVEZ");
      funcionComparacionV2(unaVez);

      //rotoDatosV3("", estadoBoton);
      console.log("estadoBoton", estadoBoton);
    }

    //funcionDETEST();
    console.log("estado boton", estadoBoton);

    //ok ,tengo una idea con esto, para si no usar un for/bucle de if, que mata el rendimiento
    // ya teniendo todo lo que se tiene,hacemos lo siguiente
    //primero, como esto es un if condicional, con 2 arrays, lo que tenemos que hacer, es ver que un elemento del array,
    //ente dentro de otro, y si ese elemento esta, ese elemento se le va a crear un event, x cada 1
    const funcionComparacion = (a, b) => {
      if (a === b) {
        //pasa algo
      } else {
        //pasa otra cosa
      }
    };

    //console.log("ENCUENTRO ALGO", encuentroALGO);
    console.log("ENCUENTRO ALGOV2", encuentroALGOV2);

    //todosLosBotones.addEventListener("click", (e) => console.log("SOY UN BOTON cualquiera", e.target));

    //
  };
  const funcionTestV2 = async (algo) => {
    console.log("ALGO", algo);
  };
  useEffect(() => {
    console.log("ESTADO BOTONES Y CARGA", estadoBotones);
    controladorDeDatosYModalsGeneralTest(estadoBotones);
    funcionTestV2(estadoBotones);
  }, [datosAutos, estadoBotones]);
  /////////
  //////////////

  useEffect(() => {
    console.log("SLIDERS LISTOS");
    console.log("ESTADO BOTONES", estadoBotones);

    //console.log("CARGA INICAL", evento);

    let botonIZQ = document.querySelector("#izquierdaVans");
    console.log("botonIZQ botonIZQ botonIZQ", botonIZQ);
    //el problema es el listener
    //botonIZQ.addEventListener("click", () => console.log("SOY UN BOTON botonIZQ botonIZQ botonIZQ"));
    setContador(contador + 1);
    console.log("CONTADOR DE CAMBIOS", contador);
  }, [imagenesOrdenadas]);

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
        <button id="openModal" onClick={() => unModal.showModal()}>
          abrir modal
        </button>
        <button id="izquierdaTEST" onClick={() => rotoDatosV2("izquierda")}>
          izquierda
        </button>
        <button id="derechaTEST" onClick={() => rotoDatosV2("derecha")}>
          derecha
        </button>

        <img
          src="https://cdn.group.renault.com/ren/ar/modelos/kangoo/ph2/kangoo-k61-ph2-desktop-header-002.jpg.ximg.xsmall.jpg/c9ee5e1b80.jpg"
          className="imgTest"
          onClick={() => unModal.showModal()}
        ></img>
        {sliderdeTest}
        {sliderdeTest2}

        {/*<div className="container">
          <dialog id="modal">
            <p>desu</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>
  </div>*/}
        {modalCambianteV2()}
      </main>
    </div>
  );
}
