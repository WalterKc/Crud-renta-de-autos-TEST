import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { obtenerDatosIniciales, verificarSeccion } from "./services/service";
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
  const estadoMenu = estado.estadoMenu;
  const setEstado = estado.setMenu;
  const estadoBotones = estado.estadoBotones;
  const setBotones = estado.setBotones;
  const imagenes = estado.arrayDeImagenes;
  const paginaActual = estado.paginaActual;
  const setPaginaActual = estado.setPagina;
  const imagenesOrdenadasServer = estado.imagenesOrdenadasServer;
  const [sliderGeneralTEST, setSliderGeneralTEST] = useState([]);
  const cookie = estado.cookie;
  const setCookie = estado.setCookie;

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
  }, [estadoMenu]);
  if (estadoMenu) {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado} cookie={cookie}></Nav>
        </header>
        <main>
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
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
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
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
                  ></Nav>
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
                Nav={
                  <Nav
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
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
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
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
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
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
                    estado={estadoMenu}
                    set={setEstado}
                    cookie={cookie}
                  ></Nav>
                }
                cookie={cookie}
                setCookie={setCookie}
                sliderVans={sliderGeneralTEST[4]}
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
  const estadoMenu = estado.estado;
  const setEstado = estado.set;
  const padre = estado.padre;
  const imagenes = estado.arrayDeImagenes;
  const ID = estado.ID;

  useEffect(() => {
    console.log("IMAGENES SLIDER GEN TAMAÑO", imagenes.length);

    acomodarImagenes(`slider-${padre}${ID}`, imagenes.length);
  }, [imagenes.length]);

  return (
    <div className="contedenor-slider ">
      <div className="slider" id={"slider-" + padre + ID}>
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

function App() {
  //boton();
  const [estadoBotones, setEstadoBotones] = useState(true);
  const [estadoMenu, setEstadoMenu] = useState(false);
  const [PaginaActual, setPaginaActual] = useState("Home");
  //id="menu-Desplegable"
  console.log("ESTADO INTERNO", estadoMenu);

  const arrayDeImagenes3 = [titulo1, titulo2, auto7];
  const [imagenesServerFinalesTest, setImagenesServerFinalesTest] = useState();
  const [cookie, setCookie] = useState({});
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
        estadoMenu={estadoMenu}
        setMenu={setEstadoMenu}
        estadoBotones={estadoBotones}
        setBotones={setEstadoBotones}
        arrayDeImagenes={[arrayDeImagenes3]}
        paginaActual={PaginaActual}
        setPagina={setPaginaActual}
        imagenesOrdenadasServer={imagenesServerFinalesTest}
        cookie={cookie}
        setCookie={setCookie}
      ></SelectorPaginaGeneral>
    </div>
  );
}

export default App;
