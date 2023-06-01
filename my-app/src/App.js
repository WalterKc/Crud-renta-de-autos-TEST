import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { boton, botonV2, eventos, mostratDatosTest, eventosV2 } from "./ui/ui";
import { obtenerDatosIniciales, verificarSeccion } from "./services/service";
import { obtenerDatosAPI } from "./selector api/api";
import { Nav } from "./componentes/nav";
import {
  DatosMain,
  DatosMain2,
  DatosMainFinales,
  SoloFlag,
  soloFlag,
} from "./componentes/main";
import { DatosHeader } from "./componentes/header";
import { DatosFooter } from "./componentes/footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/home";
import { About } from "./paginas/catalogo";
import { Catalogo } from "./paginas/catalogo";
import { Default } from "./paginas/default";
import { Layount } from "./paginas/layount";
import auto1 from "./imagenes/Chevrolet Onix.jpg";
import auto2 from "./imagenes/Chevrolet S 10.jpg";
import auto3 from "./imagenes/Fiat Cronos Drive .jpg";
import auto4 from "./imagenes/Toyota Hiace.jpg";
import auto5 from "./imagenes/Ford Ranger 2.2.jpg";
import auto6 from "./imagenes/Mercedes Benz Vito.jpg";
import auto7 from "./imagenes/Renault kangoo.jpg";
import titulo1 from "./imagenes/ejemplo 1.png";
import titulo2 from "./imagenes/ejemplo 3.png";
import { Login } from "./paginas/login";
import { Reservas } from "./paginas/reservas";
import { RegistroUsuarios } from "./paginas/registroUsuarios";
//servicio imagen
import { servicionTestUrls } from "./services/service";
import { servicioTestUrlsV2 } from "./services/service";

async function inicializador() {
  mostratDatosTest(await obtenerDatosIniciales());
}
async function otroTEST(valor) {
  return await valor;
}
const test1 = otroTEST(obtenerDatosIniciales());
const test2 = obtenerDatosIniciales();
console.log(test1);
//al use effect no le gusta nada, todo se tiene que hacer afuera para que se vean los resultados
const otrafuncion = async () => {
  let datos = await obtenerDatosIniciales();
  console.log(datos[0]);
  return datos;
};
//ESTO ES MUY BUENO; AHORA VAMOS A EXPLICAR QUE ES ESTO
//mi concepcion de react, era confunsa, react no funciones, mira FUNTION APP
//es una pta funcion, y como tal, podes usarla asi, pero con algunas cositas de mas, pero, deja de tratarla
//como algo especial y trabaja como una funcion, aca abajo tenes unos ejemplos, la usamos como una funcion
//"normal" y hacemos que pase todo lo que queremos, como queremos
//para crear los links correctos hay que cambiar esto, por que esto y hacerlo de
//proposito general
function SelectorPaginaGeneral(estado) {
  /**estados
   * este selector, tiene que compartir todos los estados del otro, asi que, hacemos un copy paste y ya
   * pero talves necesite alguno nuevo
   */
  const estadoMenu = estado.estadoMenu;
  const setEstado = estado.setMenu;
  const estadoBotones = estado.estadoBotones;
  const setBotones = estado.setBotones;
  const imagenes = estado.arrayDeImagenes;
  const paginaActual = estado.paginaActual;
  const setPaginaActual = estado.setPagina;
  const slidersTest = slidersParaEntregar(imagenes, estadoBotones, setBotones);
  const imagenesDelServer = estado.imagenesDelServer;
  const imagenesOrdenadasServer = estado.imagenesOrdenadasServer;
  const [sliderGeneralTEST, setSliderGeneralTEST] = useState([]);
  const cookie = estado.cookie;
  const setCookie = estado.setCookie;

  useEffect(() => {
    //console.log("IMAGENES SLIDER GEN TAMAÑO", imagenes.length);
    /*
    slidersParaEntregarGeneral(
      imagenesOrdenadasServer,
      estadoBotones,
      setBotones
    );
    */
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
  //ok, si queremos que los botones andes bien, hay que cambiar como funcionan esto, eliminar el limitador
  //este [imagenesOrdenadasServer], o hay que ponerle el estadoBotones, como se ve arribeño
  //console.log("IMAGENES ESTADO SELENCTOR", imagenesDelServer);
  //if else?
  /**
   * primero vamos a hacer que, por cada click a una pagina, renderize esa pagina VACIA, y que cierre el nav
   *
   */
  if (estadoMenu) {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado}></Nav>
        </header>
        <main>
          {DatosMainFinales(estadoMenu)}
          <Routes>
            <Route
              path="/"
              element={
                <Layount
                  setPagina={setPaginaActual}
                  setNav={setEstado}
                ></Layount>
              }
            >
              <Route
                path="/"
                element={<Home paginaActual={paginaActual}></Home>}
              ></Route>
              <Route
                path="/Catalogo"
                element={
                  <Catalogo
                    paginaActual={paginaActual}
                    //imagenes={imagenes}
                  ></Catalogo>
                }
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
    //aca tiene que ir la pagina selecionada, una vez cerrado el menu(se tiene que cerrar al click)
    return (
      <div>
        {/*
            <DevolverNombreCorrecto
              paginas={paginasDisponibles(paginaActual)}
              paginaSelecionada={paginaActual}
            ></DevolverNombreCorrecto>
    */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                paginaActual={paginaActual}
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
                Slider1={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenes[2]}
                    ID={0}
                  ></SliderGeneral>
                }
                Slider2={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenes[2]}
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
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
                //aca es mejor no mandar el slider entero, sino las imagenes y armar el slider alla
                //error, esto de aca, da problemas, la solucion es mandar ya los slider armados de antemano
                //lo vamos a enviar asi nomas, dentro de un array, y los selecionamos alla
                Slider1={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenes[0]}
                    ID={0}
                  ></SliderGeneral>
                }
                Sliders={slidersTest[1]}
                ImagenesTestApi={imagenesDelServer}
                SliderTestAPI={
                  <SliderGeneral
                    estado={estadoBotones}
                    set={setBotones}
                    padre={"Header"}
                    arrayDeImagenes={imagenesDelServer}
                    ID={0}
                  ></SliderGeneral>
                }
                sliderAutosChicos={sliderGeneralTEST[0]}
                sliderAutosMedianos={sliderGeneralTEST[1]}
                sliderAutosGrandes={sliderGeneralTEST[2]}
                sliderAutosPremiun={sliderGeneralTEST[5]}
                sliderCamionetas={sliderGeneralTEST[3]}
                sliderVans={sliderGeneralTEST[4]}
              ></Catalogo>
            }
          ></Route>
          <Route
            path="*"
            element={
              <Default
                paginaActual={paginaActual}
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
              ></Default>
            }
          ></Route>
          <Route
            path="/Login"
            element={
              <Login
                paginaActual={paginaActual}
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
              ></Login>
            }
          ></Route>
          <Route
            path="/Registro"
            element={
              <RegistroUsuarios
                paginaActual={paginaActual}
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
              ></RegistroUsuarios>
            }
          ></Route>
          <Route
            path="/Reservas"
            element={
              <Reservas
                paginaActual={paginaActual}
                Nav={<Nav estado={estadoMenu} set={setEstado}></Nav>}
                cookie={cookie}
                setCookie={setCookie}
              ></Reservas>
            }
          ></Route>
        </Routes>
      </div>
    );
  }

  //onclicks
  //resto (talvez)
}
//tengo que crear un generador de sliders, Y ES LO ULTIMO
/**
 * esta funcion, recibe un array json completamente ordenado, por lo que es posible
 * tener un control superior a la funcion anterior
 *
 *
 */

function slidersParaEntregarGeneral(jsonImagenes, estadoBotones, setBotones) {
  //let keys = Object.keys(jsonImagenes);
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
  //console.log("IMAGENES PARA ENTREGAR", slidersListos);
  return slidersListos;
}
function slidersParaEntregar(imagenes, estadoBotones, setBotones) {
  let slidersListos = [];
  for (let x = 0; x < imagenes.length; x++) {
    slidersListos.push(
      <SliderGeneral
        estado={estadoBotones}
        set={setBotones}
        padre={"Main"}
        arrayDeImagenes={imagenes[x]}
        ID={x}
      ></SliderGeneral>
    );
    //
  }
  //console.log("IMAGENES PARA ENTREGAR", slidersListos);
  return slidersListos;
}
//Nueva problema(solucionado) y idea
//si pongo una rideccion incorrecta , como el antior modelo, no va al default, pero creo que, si
//devolvemos la ruta, podemos arreglar todo(que se arregla), y podemos terminar esta shit de una vez

//el problema es que no tengo las paginas completas, vamos acompletarlas y vemos mas tarde que hacemos
function paginasDisponibles(estado) {
  const Paginas = [
    <Home paginaActual={estado}></Home>,
    <Catalogo paginaActual={estado}></Catalogo>,
    <Default paginaActual={estado}></Default>,
    <Login paginaActual={estado}></Login>,
    <Reservas paginaActual={estado}></Reservas>,
  ];
  const Paginas2 = [
    <Route path="/" element={<Home paginaActual={estado}></Home>}></Route>,
    <Route
      path="/Catalogo"
      element={<Catalogo paginaActual={estado}></Catalogo>}
    ></Route>,
    <Route
      path="*"
      element={<Default paginaActual={estado}></Default>}
    ></Route>,
    <Route
      path="/Login"
      element={<Login paginaActual={estado}></Login>}
    ></Route>,
    <Route
      path="/Reservas"
      element={<Reservas paginaActual={estado}></Reservas>}
    ></Route>,
  ];
  return Paginas2;
}

function DevolverNombreCorrecto(estado) {
  const paginas = estado.paginas;
  const paginaSelecionada = estado.paginaSelecionada;
  //esto es una shit, no intentes armar un html con {} y insersiones y eso POR QUE NO FUNCIONA
  //, mejor vamos a hacerlo
  //mediante comparacion y ya, que manera de perder el tiempo
  console.log("PAGINAS ", paginas[1]);
  /*const found = paginas.find(
    (pagina) => pagina.type.name === paginaSelecionada
  );

  console.log(found);*/
  /*
  if (paginas.find((pagina) => pagina.type.name === paginaSelecionada)) {
    console.log(" ES VERDAD");
    const index = paginas.findIndex(
      (pagina) => pagina.type.name === paginaSelecionada
    );
    console.log(" indice ", index);
    console.log(" propiedades ", paginas[index].props);

    //return paginas[index];
  } else {
    console.log(" ES Falso");
    console.log("paginaSelecionada", paginaSelecionada);
    //return paginas[2];
  }
  */
}
function SelectorTEST(estado) {
  const estadoMenu = estado.estadoMenu;
  const setEstado = estado.setMenu;
  const estadoBotones = estado.estadoBotones;
  const setBotones = estado.setBotones;
  const imagenes = estado.arrayDeImagenes;

  if (estadoMenu) {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado}></Nav>
        </header>
        <main>
          {DatosMainFinales(estadoMenu)}
          <Routes>
            <Route path="/" element={Layount()}>
              <Route path="/" element={Home()}></Route>
              <Route path="/Catalogo" element={Catalogo()}></Route>
              <Route path="*" element={Default()}></Route>
              <Route path="/Login" element={Login()}></Route>
              <Route path="/Reservas" element={Reservas()}></Route>
            </Route>
          </Routes>
        </main>
        <footer></footer>
      </>
    );
  } else {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado}></Nav>
          <DatosHeader></DatosHeader>
          <SliderGeneral
            estado={estadoBotones}
            set={setBotones}
            padre={"Header"}
            arrayDeImagenes={imagenes[0]}
          ></SliderGeneral>
        </header>
        <main>
          <div id="TEST">{}</div>
          <main>{DatosMainFinales(estadoMenu)}</main>
          <SliderGeneral
            estado={estadoBotones}
            set={setBotones}
            padre={"Main"}
            arrayDeImagenes={imagenes[1]}
          ></SliderGeneral>
        </main>
        <footer>
          <DatosFooter></DatosFooter>
        </footer>
      </>
    );
  }
}
function logTest(log) {
  const mensaje = console.log("MENSAJE ", log);
  return mensaje;
}
function TestEstadosAjenos(props) {
  const estado = props.test;
  const setEstado = props.set;
  /*
  if (props.test === true) {
    console.log("DATO CORRECTO");
  }
  */
  console.log("ESTADO TEST", estado);

  //const log = logTest(" hola");
  let test = "test";

  return (
    <div>
      {props.test}
      <button
        onClick={() => setEstado(!estado)}
        type="button"
        className="btn btn-primary"
        id="menu-Desplegable"
      >
        BOTON TEST
      </button>
    </div>
  );
}
//(es necesario un nuevo slider generico, por eso da error)
/**
 *
 *
 */
//NUEVO slider de proposito general

export function SliderGeneral(estado) {
  const estadoMenu = estado.estado;
  const setEstado = estado.set;
  const padre = estado.padre;
  const imagenes = estado.arrayDeImagenes;
  const ID = estado.ID;
  let test = "";
  // let selectorSlider = document.querySelector(`#slider-${padre}`);
  //selectorSlider.style.width = "-200%";
  //console.log(" selectorSlider GENERAL", selectorSlider);

  useEffect(() => {
    console.log("IMAGENES SLIDER GEN TAMAÑO", imagenes.length);

    acomodarImagenes(`slider-${padre}${ID}`, imagenes.length);
  }, [imagenes.length]);
  //este de aca arriba [imagenes.length] es es limitante, si el tamaño del array cambia, se activa
  //el efecto

  return (
    <div className="contedenor-slider ">
      <div className="slider" id={"slider-" + padre + ID}>
        {console.log(" selectorSlider GENERAL", `slider-${padre}`)}
        {/*<p>"TEST FOR"</p>
        <p>{console.log("imagenes ", imagenes.length)}</p>
  <p>{imagenes.length}</p>*/}

        {obtenerListaImagenes(imagenes)}
      </div>

      <div
        className="slider-boton slider-boton-derecha"
        id="derecha"
        onClick={() => nuevoBoton(padre + ID, estadoMenu, setEstado, "derecha")}
      >
        {">"}
      </div>
      <div
        className="slider-boton slider-boton-izquierda"
        id="izquierda"
        onClick={() =>
          nuevoBoton(padre + ID, estadoMenu, setEstado, "izquierda")
        }
      >
        {"<"}
      </div>
    </div>
  );
}
function acomodarImagenes(id, tamaño) {
  console.log("ID RECIBIDO", id);
  let elemento = document.getElementById(id);
  console.log("ELEMENTO A MODIFICAR", elemento);
  console.log("TAMAÑO", tamaño * 100);

  elemento.style.width = `${tamaño * 100}%`;
}
function obtenerListaImagenes(arrayDeImagenes) {
  let array = [];

  for (let x = 0; x < arrayDeImagenes.length; x++) {
    array.push(seccionSlider(arrayDeImagenes[x], x));
  }

  //array.push(<SeccionSlider></SeccionSlider>);
  console.log("ARRAY IMAGENES", array);
  //console.log("SeccionSlider", SeccionSlider());

  return array;
}
function seccionSlider(imagen, key) {
  return (
    <div className="seccion-slider" key={key}>
      <img src={imagen} className="slider-img"></img>
    </div>
  );
}
function SliderTest(estado) {
  //aca va la funcion de selecion
  //aca va otra cosa

  const estadoMenu = estado.estado;
  const setEstado = estado.set;
  const padre = estado.padre;

  return (
    <div className="contedenor-slider ">
      <div className="slider" id={"slider-" + padre}>
        <div className="seccion-slider">
          <img src={auto1} className="slider-img"></img>
        </div>
        <div className="seccion-slider">
          <img src={auto2} className="slider-img"></img>
        </div>

        <div className="seccion-slider">
          <img src={auto3} className="slider-img"></img>
        </div>

        <div className="seccion-slider">
          <img src={auto4} className="slider-img"></img>
        </div>
      </div>
      {/**
       * cada vez que toco un boton,tengo que cambiar un estado, puedo hacerlo de varias maneras
       * pero creo que lo mejor seria por un onclick directo, si es derecha, derecha
       * y izquierda , izquierda ,y asi
       */}
      <div
        className="slider-boton slider-boton-derecha"
        id="derecha"
        onClick={() => nuevoBoton(padre, estadoMenu, setEstado, "derecha")}
      >
        {">"}
      </div>
      <div
        className="slider-boton slider-boton-izquierda"
        id="izquierda"
        onClick={() => nuevoBoton(padre, estadoMenu, setEstado, "izquierda")}
      >
        {"<"}
      </div>
    </div>
  );
}
function selectorBotonCorrecto(e) {
  let elemento = e;
  //let padre = selector;
  let slider = document.querySelector(".slider");
  console.log("elemento", e.target);
  console.log("elemento clase", e.target.className);
  console.log("elemento padre", e.target.parentElement);
}
//funcional al 100%
function nuevoBoton(padreSlider, estado, set, boton) {
  const botonActivo = estado;
  const setBoton = set;

  //seleciono el boton del padre adecuado,cada padre tiene que tener su ID X
  //no hay que selecionar el botono, hay que selecionar el slider
  let slider = "slider-" + padreSlider;
  console.log("SELECTOR SLIDER ", slider);
  let selectorSlider = document.querySelector(`#${slider}`);
  console.log("SELECTOR SLIDER 2", selectorSlider);

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
  //termino
}
function botones(estado, set, boton, padre) {
  const botonActivo = estado;
  const setBoton = set;

  if (boton === "derecha" && botonActivo) {
    setBoton(false);

    let slider = document.querySelector(`#${padre}`);
    let seccionesSlider = document.querySelectorAll(".seccion-slider");
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function () {
      slider.style.transition = "none";
      slider.insertAdjacentElement("beforeend", seccionesSlider[0]);
      slider.style.marginLeft = "-100%";
      setBoton(true);
    }, 500);
  } else if (boton === "izquierda" && botonActivo) {
    setBoton(false);

    let slider = document.querySelector(`#${padre}`);
    let seccionesSlider = document.querySelectorAll(".seccion-slider");
    slider.style.marginLeft = "-0%";
    slider.style.transition = "all 0.5s";
    setTimeout(function () {
      slider.style.transition = "none";
      slider.insertAdjacentElement(
        "afterbegin",
        seccionesSlider[seccionesSlider.length - 1]
      );
      slider.style.marginLeft = "-100%";
      setBoton(true);
    }, 500);
  }
}

//Hagamos una nueva funcion de control, que deje activo el menu cuando toquemos el boton de menu
//y lo quite cuando lo volvamos a tocar
//de la siguiente manera, cuando toquemos el boton de listaDesplegable, cambiamos el estado a true
//y cuando lo toquemos otra vez, a false
/**
 *
 * PROBAMOS LAS IMAGENES POR SERVIRDOR, HAY QUE PASARLAS COMO ESTADO
 */

/**
 * aca se hace la primera comprobacion de login, asi que hay que traer las funciones de apoyo
 * y modificar el server con los true y false adecuados(que todavia no estan puestos*LISTO*)
 * a las funciones que llaman a la api, van en la api, asi que hay que moverlas alla y darle un nombre
 * decente
 */
/**
 * anteultima modificacion de la app principal, vamos a agregar la comprobacion automatica final
 * todos los servicios son funcionales completamente, pero, hay que crear algunas funciones extra
 * para hacer las comprobaciones automaticas, aca vamos traer la expliacion que hicimos antes y la
 * vamos a terminar y completar
 *
 */

/**
 * lo primero que hace la app, es verificar que ya estemos logeados, de la siguiente manera
 * primero, verifica que tenga una cookie en la pagina, si no la tiene, no esta logeado y se acaba
 * tambien, ahy que setear la cookie interna a false,
 * pero si la tiene, verifica que esa cookie sea correcta, usando los verifiadores de aqui,
 * si recibe un true como respuesta, esta logeado, y escribe un estado de logeado(esto se puede mejorar
 * con un local storage), y este estado, es el que se va a usar para todos las paginas que los necesiten
 * una vez echo esto, no es necesario volver a hacer esto, hasta que se cierre la pagina(esto puede cambiar)
 * caso contrario , de que la cookie no sea correcta, la borra

 */

const verificarCookieInicial = async (cookieAPP, setCookieAPP) => {
  if (document.cookie.length > 0) {
    const verificoSeccion = await verificarSeccion();
    console.log("DATOS VERIFICACION", verificoSeccion);
    if (verificoSeccion.estadoVerificacion) {
      //pasa verificacion

      const cookies = document.cookie;
      const cookieBruta = decodeURIComponent(cookies);
      const cookiePares = cookieBruta.split("j:");
      const valoresCookie = JSON.parse(cookiePares[1]);
      //console.log(valoresCookie);
      //si la cookie externa no es igual a la interna
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

    /*
    document.cookie =
      "UnaCookieEspecial  =; expires=Thu, 1 Jan 1970 00:00:00 UTC";
    setCookieAPP(false);
    console.log("cookies despues de quitarla", cookieApp);*/
  } else {
    setCookieAPP(false);
    console.log("No hay cookie, no se puede quitar lo que no hay");
  }
};

function App() {
  //boton();
  const [estadoBotones, setEstadoBotones] = useState(true);
  const [estadoMenu, setEstadoMenu] = useState(false);
  const [PaginaActual, setPaginaActual] = useState("Home");
  //id="menu-Desplegable"
  console.log("ESTADO INTERNO", estadoMenu);
  const arrayDeImagenes = [auto1, auto2, auto3, auto4];
  const arrayDeImagenes2 = [auto5, auto6, auto7];
  const arrayDeImagenes3 = [titulo1, titulo2, auto7];
  console.log("imagenes APP", arrayDeImagenes.length);
  const [imagenesServer, setImagenesServer] = useState([]);
  const [imagenesServerFinalesTest, setImagenesServerFinalesTest] = useState();
  const [cookie, setCookie] = useState({});
  useEffect(() => {
    //inicializador("DATOS DE TEST");
    //inicializador();
    //let jsonselector = otrafuncion();
    //console.log(" el log", otrafuncion());
    //acomodarImagenes(`slider-${"Header"}`, 3);
    const envioUrlsTest = async () => {
      //let array = await obtenerArrayNombresIMGV2();
      //let array2 = await obtenerUrlsIMG(array);
      let urls = await servicionTestUrls();
      let urlsFinalesTest = await servicioTestUrlsV2();
      //console.log("URLS V1 SERVER", urls);
      //console.log("URLS V2 SERVER", urlsFinalesTest);
      //console.log("URLS V2 KEYS", Object.keys(urlsFinalesTest));

      //let url = await obtener1IMG();
      //console.log(url);
      setImagenesServer(urls);
      setImagenesServerFinalesTest(urlsFinalesTest);

      //return urls;
    };
    envioUrlsTest();
    const unTest = async () => {
      await verificarCookieInicial(cookie, setCookie);
      //setCookie({ mensaje: "algo" });
      console.log("COOKIE INTERNA APP", cookie);
    };
    unTest();
    //console.log("COOKIE INTERNA APP", cookie);
  }, []);
  /*
  useEffect(() => {
    const unTest = async () => {
      await verificarCookieInicial(cookie, setCookie);
      //setCookie({ mensaje: "algo" });
      console.log("COOKIE INTERNA APP", cookie);
    };
    unTest();
    console.log("COOKIE INTERNA APP", cookie);
  }, [cookie]);
  */

  return (
    <div
      className="App"
      //onClick={(e) => eventosV2(e.target, estado, setEstado)}
    >
      <h1>RUTAS</h1>
      {/*TestEstadosAjenos()*/}
      {/*console.log(estadoMenu)*/}
      {/*Nav(estadoMenu)*/}
      {/*<TestEstadosAjenos test={estadoMenu} set={setEstadoMenu} />*/}

      {/*
        <SelectorTEST
          estadoMenu={estadoMenu}
          setMenu={setEstadoMenu}
          estadoBotones={estadoBotones}
          setBotones={setEstadoBotones}
          arrayDeImagenes={[arrayDeImagenes, arrayDeImagenes2]}
        ></SelectorTEST>
  */}
      <SelectorPaginaGeneral
        estadoMenu={estadoMenu}
        setMenu={setEstadoMenu}
        estadoBotones={estadoBotones}
        setBotones={setEstadoBotones}
        arrayDeImagenes={[arrayDeImagenes, arrayDeImagenes2, arrayDeImagenes3]}
        paginaActual={PaginaActual}
        setPagina={setPaginaActual}
        imagenesDelServer={imagenesServer}
        imagenesOrdenadasServer={imagenesServerFinalesTest}
        cookie={cookie}
        setCookie={setCookie}
      ></SelectorPaginaGeneral>

      {/*<SliderTest estado={estadoBotones} set={setEstado}></SliderTest>*/}

      {/*
      <header>
        <Nav estado={estadoMenu} set={setEstadoMenu}></Nav>
      </header>

  {selectorTEST(estadoMenu)}*/}
    </div>
  );
}

export default App;
