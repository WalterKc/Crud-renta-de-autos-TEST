import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  obtenerDatosIniciales,
  verificarSeccion,
  obtenerAutos,
} from "./services/service";
import { Nav } from "./componentes/nav";

import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/home";
import { Catalogo } from "./paginas/catalogo";
import { Default } from "./paginas/default";
import { Layount } from "./paginas/layount";

import auto7 from "./imagenes/Renault kangoo.jpg";
import titulo1 from "./imagenes/ejemplo 1.png";
import titulo2 from "./imagenes/ejemplo 3.png";
import { Login } from "./paginas/login";
import { Reservas } from "./paginas/reservas";
import { RegistroUsuarios } from "./paginas/registroUsuarios";
//servicio imagen
import { envioUrlsImgs } from "./services/service";

async function otroTEST(valor) {
  return await valor;
}
//const test1 = otroTEST(obtenerDatosIniciales());
function SelectorPaginaGeneral(estado) {
  const estadoMenuDespleglable = estado.estadoMenuDespleglable;
  const setEstadoMenuDesplegable = estado.setEstadoMenuDesplegable;
  const estadoBotones = estado.estadoBotones;
  const setBotones = estado.setBotones;
  const imagenes = estado.arrayDeImagenes;
  const paginaActual = estado.paginaActual;
  const setPaginaActual = estado.setPagina;
  const imagenesOrdenadasServer = estado.imagenesOrdenadasServer;
  const [sliderGeneralTEST, setSliderGeneralTEST] = useState([]);
  const cookie = estado.cookieApp;
  const setCookie = estado.setCookieApp;
  const arrayDeAutosSelecionados = estado.arrayDeAutosSelecionados;
  const setArrayDeAutosSelecionados = estado.setArrayDeAutosSelecionados;

  useEffect(() => {
    const TestSlidersGeneral = async () => {
      const slidersGenerales = slidersParaEntregarGeneral(
        imagenesOrdenadasServer,
        estadoBotones,
        setBotones
      );
      setSliderGeneralTEST(slidersGenerales);
    };
    TestSlidersGeneral();
    console.log("imagenesOrdenadasServer ", imagenesOrdenadasServer);
  }, [imagenesOrdenadasServer, estadoBotones]);
  useEffect(() => {
    let ocultoSegundoMain = document.querySelectorAll("main");
    if (ocultoSegundoMain[1] !== undefined) {
      console.log("SEGUNDOMAIN", ocultoSegundoMain[1]);
      ocultoSegundoMain[1].hidden = true;
    } else {
      console.log("NADA DE NADA");
    }
  }, [estadoMenuDespleglable]);
  if (estadoMenuDespleglable) {
    return (
      <>
        <header>
          <Nav
            estadoMenuDespleglable={estadoMenuDespleglable}
            setEstadoMenuDesplegable={setEstadoMenuDesplegable}
            cookie={cookie}
            setCookie={setCookie}
          ></Nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Layount
                  setPagina={setPaginaActual}
                  setNav={setEstadoMenuDesplegable}
                ></Layount>
              }
            >
              <Route
                path="/"
                element={<Home paginaActual={paginaActual}></Home>}
              ></Route>
              <Route
                path="/Catalogo"
                element={<Catalogo paginaActual={paginaActual}></Catalogo>}
              ></Route>
              <Route
                path="*"
                element={<Default paginaActual={paginaActual}></Default>}
              ></Route>
              <Route
                path="/Login"
                element={<Login paginaActual={paginaActual}></Login>}
              ></Route>
              <Route
                path="/Reservas"
                element={<Reservas paginaActual={paginaActual}></Reservas>}
              ></Route>
              <Route
                path="/Registro"
                element={
                  <RegistroUsuarios
                    paginaActual={paginaActual}
                  ></RegistroUsuarios>
                }
              ></Route>
            </Route>
          </Routes>
        </main>
        <footer></footer>
      </>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
                Slider1={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenes[0]}
                    ID={0}
                  ></SliderGeneral>
                }
                Slider2={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenes[0]}
                    ID={1}
                  ></SliderGeneral>
                }
              ></Home>
            }
          ></Route>
          <Route
            path="/Catalogo"
            element={
              <Catalogo
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
                sliderAutosChicos={sliderGeneralTEST[0]}
                sliderAutosMedianos={sliderGeneralTEST[1]}
                sliderAutosGrandes={sliderGeneralTEST[2]}
                sliderAutosPremiun={sliderGeneralTEST[5]}
                sliderCamionetas={sliderGeneralTEST[3]}
                sliderVans={sliderGeneralTEST[4]}
                estadoBotones={estadoBotones}
                imagenesOrdenadas={imagenesOrdenadasServer}
                sliderGeneralEstado={sliderGeneralTEST}
                arrayDeAutosSelecionados={arrayDeAutosSelecionados}
                setArrayDeAutosSelecionados={setArrayDeAutosSelecionados}
              ></Catalogo>
            }
          ></Route>
          <Route
            path="*"
            element={
              <Default
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
              ></Default>
            }
          ></Route>
          <Route
            path="/Login"
            element={
              <Login
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
                cookie={cookie}
                setCookie={setCookie}
              ></Login>
            }
          ></Route>
          <Route
            path="/Registro"
            element={
              <RegistroUsuarios
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
              ></RegistroUsuarios>
            }
          ></Route>
          <Route
            path="/Reservas"
            element={
              <Reservas
                paginaActual={paginaActual}
                Nav={
                  <Nav
                    estadoMenuDespleglable={estadoMenuDespleglable}
                    setEstadoMenuDesplegable={setEstadoMenuDesplegable}
                    cookie={cookie}
                    setCookie={setCookie}
                  ></Nav>
                }
                cookie={cookie}
                setCookie={setCookie}
                sliderVans={sliderGeneralTEST[4]}
                sliderPremiun={sliderGeneralTEST[5]}
                sliderGeneralEstado={sliderGeneralTEST}
                estadoBotones={estadoBotones}
                imagenesOrdenadas={imagenesOrdenadasServer}
                arrayDeAutosSelecionados={arrayDeAutosSelecionados}
                setArrayDeAutosSelecionados={setArrayDeAutosSelecionados}
              ></Reservas>
            }
          ></Route>
        </Routes>
      </div>
    );
  }
}

function slidersParaEntregarGeneral(jsonImagenes, estadoBotones, setBotones) {
  let slidersListos = [];
  for (let x = 0; x < Object.keys(jsonImagenes).length; x++) {
    slidersListos.push(
      <SliderGeneral
        estado={estadoBotones}
        set={setBotones}
        padre={"Main"}
        arrayDeImagenes={Object.values(jsonImagenes)[x]}
        ID={Object.keys(jsonImagenes)[x]}
      ></SliderGeneral>
    );
    //
    console.log(" IMAGENES DEL SERVER", Object.values(jsonImagenes)[x]);
  }
  return slidersListos;
}

export function SliderGeneral(estado) {
  const estadoBotones = estado.estado;
  const setEstadoMenuDesplegable = estado.setEstadoMenuDesplegable;
  const padre = estado.padre;
  const imagenes = estado.arrayDeImagenes;
  const ID = estado.ID;

  useEffect(() => {
    console.log("IMAGENES SLIDER GEN TAMAÑO", imagenes.length);

    acomodarImagenes(`slider-${padre}${ID}`, imagenes.length);
  }, [imagenes.length]);

  return (
    <div className="contedenor-slider " id={ID}>
      <div className="slider" id={"slider-" + padre + ID}>
        {obtenerListaImagenes(imagenes)}
      </div>

      <div
        className="slider-boton slider-boton-derecha"
        id={"derecha" + ID}
        onClick={() =>
          nuevoBoton(
            padre + ID,
            estadoBotones,
            setEstadoMenuDesplegable,
            "derecha"
          )
        }
        hidden={!estadoBotones}
      >
        {">"}
      </div>
      <div
        className="slider-boton slider-boton-izquierda"
        id={"izquierda" + ID}
        onClick={() =>
          nuevoBoton(
            padre + ID,
            estadoBotones,
            setEstadoMenuDesplegable,
            "izquierda"
          )
        }
        hidden={!estadoBotones}
      >
        {"<"}
      </div>
    </div>
  );
}
function acomodarImagenes(id, tamaño) {
  let elemento = document.getElementById(id);

  elemento.style.width = `${tamaño * 100}%`;
}
function obtenerListaImagenes(arrayDeImagenes) {
  let array = [];

  for (let x = 0; x < arrayDeImagenes.length; x++) {
    array.push(seccionSlider(arrayDeImagenes[x], x));
  }

  return array;
}
function seccionSlider(imagen, key) {
  return (
    <div className="seccion-slider" key={key}>
      <img src={imagen} className="slider-img"></img>
    </div>
  );
}

function nuevoBoton(padreSlider, estado, set, boton) {
  const botonActivo = estado;
  const setBoton = set;

  let slider = "slider-" + padreSlider;
  let selectorSlider = document.querySelector(`#${slider}`);

  //if/else
  if (boton === "derecha" && botonActivo) {
    setBoton(false);
    let seccionesSlider = selectorSlider.querySelectorAll(".seccion-slider");
    selectorSlider.style.marginLeft = "-200%";
    selectorSlider.style.transition = "all 0.5s";

    console.log(`este es el Boton ${boton} del elemento ${padreSlider}`);
    setTimeout(function () {
      selectorSlider.style.transition = "none";
      selectorSlider.insertAdjacentElement("beforeend", seccionesSlider[0]);
      selectorSlider.style.marginLeft = "-100%";

      setBoton(true);
    }, 500);
  } else if (boton === "izquierda" && botonActivo) {
    setBoton(false);
    let seccionesSlider = selectorSlider.querySelectorAll(".seccion-slider");
    selectorSlider.style.marginLeft = "-0%";
    selectorSlider.style.transition = "all 0.5s";

    console.log(`este es el Boton ${boton} del elemento ${padreSlider}`);
    setTimeout(function () {
      selectorSlider.style.transition = "none";
      selectorSlider.insertAdjacentElement(
        "afterbegin",
        seccionesSlider[seccionesSlider.length - 1]
      );
      selectorSlider.style.marginLeft = "-100%";

      setBoton(true);
    }, 500);
  }
}

const verificarCookieInicial = async (cookieAPP, setCookieAPP) => {
  if (document.cookie.length > 0) {
    const verificoSeccion = await verificarSeccion();
    console.log("DATOS VERIFICACION", verificoSeccion);
    if (verificoSeccion.estadoVerificacion) {
      const cookies = document.cookie;
      const cookieBruta = decodeURIComponent(cookies);
      const cookiePares = cookieBruta.split("j:");
      const valoresCookie = JSON.parse(cookiePares[1]);
      if (cookieAPP !== valoresCookie) {
        setCookieAPP(valoresCookie);
      } else {
        console.log("se seteo la cookie", cookieAPP);
      }

      console.log(
        " paso la verificacion,  es una cookie valida",
        "cookie interna",
        cookieAPP
      );
    } else {
      setCookieAPP(false);
      document.cookie =
        "UnaCookieEspecial  =; expires=Thu, 1 Jan 1970 00:00:00 UTC";
      console.log("no paso la verificacion, no es una cookie valida");
    }
  } else {
    setCookieAPP(false);
    console.log("No hay cookie, no se puede quitar lo que no hay");
  }
};
/**
 * aca van las funcion de rotoinjeccionaxial y modales
 * esto es un agregado a lo que ya existe y tiene sus propios estados y condiciones para usarse, pero es muy sencillo
 * ya que esta todo automatizado, voy a explicar que hay que hacer para que esto funcione en donde halla slider que
 * necesiten un modal/info a mostrar, solo hay que importar las funciones  dentro de useEffect correspondientes
 * (que se van a entregar), y crear los estados necesarios que se requieran , generalmente, igual al numeor de sliders
 * ok, esto funciona parecido a un componente, pero, como es de proposito geral, no se puede "exporta", asi no mas
 * ya que, usa valores/estado internos que el componente no lleva, por que es general, lo que hay que hacer es simple
 * donde esto se quiera usa, hay que copiarlo, dentro del componente, debajo de todos los estados, y dentro de ningun
 * useEffect, la iniciacion, si es con un useEffect, pero eso se va a dar mas adelante
 * a esto tambien se le agrega un par de cosas, 1, los datos de los autos en si, que son personales de cada componente,
 * y lo que llama a los datos de la api, que viene de un servicio,
 */

/**
 * CARGADOR DE DATOS
 * aca tenemos el cargador de autos para cada componente, YA SE QUE SE PUEDE PASAR COMO EL RESTO
 * pero, por ahora lo dejo asi, hasta tener mas conocimiento
 * esto funciona igual que el rotador, se copia y se pega dentro de donde se quiere y creamos los estados que necesitemos
 * cuidado siempre que los estados tengan los nombres correctos
 *
 */
//const [datosAutosV2, setDatosAutosV2] = useState();
//const [Vans, setVans] = useState();
//const [Premiun, setPremiun] = useState();

const autos = async () => {
  const autos = await obtenerAutos();
  console.log("ESTOS SON LOS AUTOS", autos.Vans[0]);
  //setDatosAutosV2(autos);

  //setVans(autos.Vans[1]);
  //setPremiun(autos.Premiun[1]);

  //return [Object.keys(autos.vans[0]), Object.values(autos.vans[0])];
};
/**
 * EL MODAL EN SI
 * este modal, es el modal que se va a usar para mostrar los datos, es necesario que tenga para si un estado interno
 * selectorModal (el de abajo) y un modal selector, este
    const unModal = document.querySelector("#modal");
  * tambien hay que llamarlo en el return de donde se quiera usar, asi
    {modalCambianteV2(selectorModal)}

 */
//const [selectorModal, setSelectorModal] = useState();

/*

const modalCambianteV2 = (algo) => {
  //hay que hacer el selector externo y ya

  console.log("Vans ", Vans);
  if (autoActual === undefined || algo === undefined) {
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
          <p> {`Marca:${eval(algo).Marca}`}</p>
          <p> {`Modelo:${eval(algo).Modelo}`}</p>
          <p> {`Año:${eval(algo).Año}`}</p>
          <p> {`Kms:${eval(algo).Kms}`}</p>
          <p> {`Color:${eval(algo).Color}`}</p>
          <p> {`Pasajeros:${eval(algo).Pasajeros}`}</p>
          <p> {`trasmision:${eval(algo).trasmision}`}</p>
          <p> {`Aire acondicionado: Si`}</p>

          {/*<p>{eval(algo).Marca}</p>}

          <form method="dialog">
            {/*<button onClick={() => unModal.close()}>OK</button>}
            <button>OK</button>
          </form>
          {/*<button id="cerrarModal">Cerrar</button>}
        </dialog>
      </div>
    );
  }
};
*/
/**
 * control de modal, este de aca abajo , controla el modal en si, es para que funcine, es necesario el estado estadoSliders
 * de la APP
 

useEffect(() => {
  const imagenes = async () => {
    const imagenSlider = document.querySelectorAll(".seccion-slider"); //la imagen 1 es la principal siempre
    const imagenpadre = document.querySelectorAll(".slider");
    console.log("SLIDERS ", imagenSlider[1]);
    console.log("DATOS AUTOS", autoActual);
    console.log("DATOS AUTOS V2", autoActualV2[0][1]);
    console.log("TODOS LOS DATOS JUNTOS", datosAutos);
    for (let x = 0; x < imagenpadre.length; x++) {
      console.log("ARRAYS DE SLIDERS", imagenpadre[x].childNodes[1]);
      console.log("ARRAYS DE SLIDERS PADRE", imagenpadre[x].id);
      console.log(
        "ARRAYS DE SLIDERS ABUELO ID",
        imagenpadre[x].parentElement.id
      );

      imagenpadre[x].childNodes[1].addEventListener("click", () => [
        unModal.close(),
        unModal.showModal(),
        setSelectorModal(imagenpadre[x].parentElement.id),
      ]);
    }
    console.log("ESTADO SELECCION PREMIUN", Premiun);
    console.log("ESTADO SELECCION VANS", Vans);

    window.onclick = function (event) {
      if (event.target === unModal) {
        unModal.close();
      }
    };
  };
  imagenes();
 
}, [estadoSliders]);

*/

/**
 * ROTOINJECTOR, requiere el estado unaVez
 */

//const [unaVez, setUnaVez] = useState(false);

const rotoinjeccionaxialV3 = async (
  estadoBoton,
  DatosDelServidor,
  unaVez,
  setUnaVez
) => {
  console.log("TODOS LOS DATOS DE LOS AUTOS x TIPOS", DatosDelServidor);
  const keys = Object.keys(DatosDelServidor);

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

  const encuentroALGOV3a = onclickDerecha.filter((boton) => boton !== null);
  console.log("encuentroALGOV3a", encuentroALGOV3a);

  const SelectorEstado = (elemento) => {
    let selector = `set${elemento};`;
    let selectorConvertido = eval(selector);
    console.log("Selector ESTADO", selector);
    //setPremiun(true);
    //eval, transforma un string en una funcion, pero solo eso, nada mas, es util para selecionar funciones
    //YA CREADAS
    return selectorConvertido;
  };

  const rotoDatosV3 = async (boton, estadoBoton) => {
    const cosa = document.querySelectorAll("#slider-MainVans");
    let actual = cosa[0].childNodes;
    let pasado = cosa[0].childNodes;

    if (estadoBoton) {
      actual = cosa[0].childNodes;

      let selecion3 = "Vans";
      let selecionGeneral = "";
      //let cosa = document.querySelectorAll("#slider-MainVans");

      //este es que hay que selecionar
      //let mapV2 = await datosAutos;
      let mapV3 = await DatosDelServidor;

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

        console.log(
          "ESTE ES EL ARRAY QUE HAY QUE ROTAR",
          selecion2.nombre,
          boton.id.split("izquierda")[1],
          "seleccionGeneral",
          selecionGeneral,
          mapV3[selecionGeneral]
        );
        //console.log("cosa", cosa2);
        let cosa3 = cosa[0].childNodes;
        console.log("cosa3", cosa3);
        console.log("cosa CUENTA");
        //ESTA AL REVEZ!

        if (actual[1].childNodes[0].src === pasado[1].childNodes[0].src) {
          console.log("array antes", mapV3[selecionGeneral][1]);
          let popV2 = mapV3[selecionGeneral].pop();

          mapV3[selecionGeneral].unshift(popV2);

          console.log("array despues", mapV3[selecionGeneral][1]);

          const selectorEstado = SelectorEstado(selecionGeneral);
          selectorEstado(mapV3[selecionGeneral][1]);
        } else {
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

          console.log("array antes", mapV3[selecionGeneral][1]);

          let shiftV2 = mapV3[selecionGeneral].shift();
          mapV3[selecionGeneral].push(shiftV2);
          console.log("array despues", mapV3[selecionGeneral][1]);
          const selectorEstado = SelectorEstado(selecionGeneral);
          selectorEstado(mapV3[selecionGeneral][1]);
        } else {
          console.log("LA COSA NO EXISTE");
        }
      } else {
        console.log("LA COSA NO EXISTE o el boton es false");
      }
    } else {
      pasado = cosa[0].childNodes;
      console.log("NO ESTAN ACTIVOS R", pasado[1].childNodes[0].src);
    }
  };

  const funcionComparacionV2 = (onclickCreados) => {
    const cosa0 = document.querySelectorAll("#slider-MainVans");
    const cosa1 = cosa0[0].childNodes;
    console.log("cosa1", cosa1);

    for (let x = 0; x < todosLosBotones.length; x = x + 2) {
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
      } else {
        console.log("ALGO HICEM MAL SEGURO; NO EXISTE");
      }
    }
  };
  if (unaVez === false) {
    if (estadoBoton) {
      funcionComparacionV2(unaVez);
      setUnaVez(true);
    } else {
      console.log("nada");
    }
  } else {
    //funcionComparacionV2(unaVez);
  }
};

/**
 * useEffect para la funcion autos (requiere de el estado imagenesOrdenadas de la app )
  useEffect(() => {
    const cargarAutos = async () => {
      await autos();
    };
    cargarAutos();

  }, [imagenesOrdenadas])

  *useEffect para la funcion rotoinjeccionaxialV3,(requiere el estado datosAutos de autos, y estadoBotones de la app)
  useEffect(() => {
    console.log("ESTADO BOTONES Y CARGA", estadoBotones);

   

    //rotoinjeccionaxialV3(estadoBotones, datosAutosV2, unaVez, setUnaVez);
  }, [datosAutosV2, estadoBotones]);

 */

function App() {
  //boton();
  const [estadoBotones, setEstadoBotones] = useState(true);
  const [estadoMenuDespleglable, setEstadoMenu] = useState(false);
  const [PaginaActual, setPaginaActual] = useState("Home");
  //id="menu-Desplegable"
  console.log("ESTADO INTERNO", estadoMenuDespleglable);

  const arrayDeImagenes3 = [titulo1, titulo2, auto7];
  const [imagenesServerFinalesTest, setImagenesServerFinalesTest] = useState();
  const [cookie, setCookie] = useState({});
  const [arrayDeAutosSelecionados, setArrayDeAutosSelecionados] = useState([]);
  useEffect(() => {
    const envioUrlsTest = async () => {
      let urlsFinalesTest = await envioUrlsImgs();

      setImagenesServerFinalesTest(urlsFinalesTest);
    };
    envioUrlsTest();
    const unTest = async () => {
      await verificarCookieInicial(cookie, setCookie);
      console.log("COOKIE INTERNA APP", cookie);
    };
    unTest();
  }, []);

  useEffect(() => {
    const unTest = async () => {
      await verificarCookieInicial(cookie, setCookie);
      console.log("COOKIE INTERNA APP", cookie);
    };
    unTest();
    console.log("COOKIE INTERNA APP", cookie);
  }, [PaginaActual]);

  return (
    <div className="App">
      <SelectorPaginaGeneral
        estadoMenuDespleglable={estadoMenuDespleglable}
        setEstadoMenuDesplegable={setEstadoMenu}
        estadoBotones={estadoBotones}
        setBotones={setEstadoBotones}
        arrayDeImagenes={[arrayDeImagenes3]}
        paginaActual={PaginaActual}
        setPagina={setPaginaActual}
        imagenesOrdenadasServer={imagenesServerFinalesTest}
        cookieApp={cookie}
        setCookieApp={setCookie}
        arrayDeAutosSelecionados={arrayDeAutosSelecionados}
        setArrayDeAutosSelecionados={setArrayDeAutosSelecionados}
      ></SelectorPaginaGeneral>
    </div>
  );
}

export default App;
