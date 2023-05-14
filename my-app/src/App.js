import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { boton, botonV2, eventos, mostratDatosTest, eventosV2 } from "./ui/ui";
import { obtenerDatosIniciales } from "./services/service";
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
import { About } from "./paginas/about";
import { Default } from "./paginas/default";
import { Layount } from "./paginas/layount";
import auto1 from "./imagenes/Chevrolet Onix.jpg";
import auto2 from "./imagenes/Chevrolet S 10.jpg";
import auto3 from "./imagenes/Fiat Cronos Drive .jpg";
import auto4 from "./imagenes/Toyota Hiace.jpg";
import auto5 from "./imagenes/Ford Ranger 2.2.jpg";
import auto6 from "./imagenes/Mercedes Benz Vito.jpg";
import auto7 from "./imagenes/Renault kangoo.jpg";

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
              <Route path="/About" element={About()}></Route>
              <Route path="*" element={Default()}></Route>
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

function SliderGeneral(estado) {
  const estadoMenu = estado.estado;
  const setEstado = estado.set;
  const padre = estado.padre;
  const imagenes = estado.arrayDeImagenes;
  let test = "";
  // let selectorSlider = document.querySelector(`#slider-${padre}`);
  //selectorSlider.style.width = "-200%";
  //console.log(" selectorSlider GENERAL", selectorSlider);

  useEffect(() => {
    acomodarImagenes(`slider-${padre}`, imagenes.length);
  });
  return (
    <div className="contedenor-slider ">
      <div className="slider" id={"slider-" + padre}>
        {console.log(" selectorSlider GENERAL", `slider-${padre}`)}
        {/*<p>"TEST FOR"</p>
        <p>{console.log("imagenes ", imagenes.length)}</p>
  <p>{imagenes.length}</p>*/}

        {obtenerListaImagenes(imagenes)}
      </div>

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
function App() {
  useEffect(() => {
    //inicializador("DATOS DE TEST");
    //inicializador();
    //let jsonselector = otrafuncion();
    //console.log(" el log", otrafuncion());
    //acomodarImagenes(`slider-${"Header"}`, 3);
  });
  //boton();
  const [estadoBotones, setEstadoBotones] = useState(true);
  const [estadoMenu, setEstadoMenu] = useState(false);
  //id="menu-Desplegable"
  console.log("ESTADO INTERNO", estadoMenu);
  const arrayDeImagenes = [auto1, auto2, auto3, auto4];
  const arrayDeImagenes2 = [auto5, auto6, auto7];
  console.log("imagenes APP", arrayDeImagenes.length);

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

      {
        <SelectorTEST
          estadoMenu={estadoMenu}
          setMenu={setEstadoMenu}
          estadoBotones={estadoBotones}
          setBotones={setEstadoBotones}
          arrayDeImagenes={[arrayDeImagenes, arrayDeImagenes2]}
        ></SelectorTEST>
      }

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
