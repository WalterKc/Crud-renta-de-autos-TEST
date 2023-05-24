import { SliderGeneral } from "../App";
import { useEffect, useState } from "react";
import { servicionTestUrls } from "../services/service";
//import imagen from "http://localhost:8080/Imagenes-Autos/Fiat%20Cronos%20Drive%20.jpg";

const UrlIMGTEST1 = "http://localhost:8080/TEST_IMAGENES";
const UrlIMGTEST2 = "http://localhost:8080/Imagenes-Autos/";

async function obtenerArrayNombresIMG() {
  return (await fetch(UrlIMGTEST1)).json();
}
//correcto, ambos
async function logTEST() {
  console.log(await obtenerArrayNombresIMG());
}
async function selectorIMG() {
  let img = await obtenerArrayNombresIMG();
  return img[1];
}
async function logTEST2() {
  console.log(await selectorIMG());
}
async function obtener1IMG() {
  const nombre = UrlIMGTEST2 + (await selectorIMG());

  //const img = (await fetch(UrlIMGTEST2 + selectorIMG())).json();
  return nombre;
}
async function logTEST3() {
  console.log(await obtener1IMG());
}
async function obtener1IMGv2() {
  //const nombre = UrlIMGTEST2 + (await selectorIMG());

  const img = (await fetch(await obtener1IMG())).json();
  return img;
}
async function devuelvoURL() {
  let nombre = await obtener1IMG();
  return nombre;
}
/**
 * API GENERAL (a mover)
 */
async function obtenerArrayNombresIMGV2() {
  const nombres = (await fetch(UrlIMGTEST1)).json();
  return nombres;
  //await nombres.forEach((autos) => console.log("AUTOSSSSS", autos));
  //arrayNombres.push(file);
}

async function obtenerUrlsIMG(nombre) {
  let urls = [];
  for (let x = 0; x < nombre.length; x++) {
    //console.log(nombre);
    //console.log(x);
    urls.push(UrlIMGTEST2 + nombre[x]);
  }
  return urls;
}

async function logTEST4() {
  let array = await obtenerArrayNombresIMGV2();
  let array2 = await obtenerUrlsIMG(array);
  //console.log("ARRAY LOG TEST 4", array2);
}

//let imagen = obtener1IMGv2();

/**
 * test de imagenes API
 */
//OK, HAY VARIAS FORMAS DE HACER ESTO, PERO, haga como se haga, hay que mandar las urls por algun lado
//vamos a intentar mandar las urls como estado, solo para jugar , las 4 que hay, y si va, va
//y si no, vamos a ver

export function Catalogo(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const sliders = estado.Sliders;
  const slider1 = estado.Slider1;
  const imagenDelServer = estado.ImagenesTestApi;
  const SliderAPI = estado.SliderTestAPI;
  const sliderAutosChicos = estado.sliderAutosChicos;
  const sliderAutosMedianos = estado.sliderAutosMedianos;
  const sliderAutosGrandes = estado.sliderAutosGrandes;
  const sliderAutosPremiun = estado.sliderAutosPremiun;
  const sliderCamionetas = estado.sliderCamionetas;
  const sliderVans = estado.sliderVans;
  /*
  const imagenes = estado.imagenes;
  const setBotones = estado.setBotones;
  const estadoBotones = estado.estadoBotones;
  */
  const nav = estado.Nav;
  //logTEST();
  //logTEST2();
  //logTEST3();
  logTEST4();

  const [url, setUrl] = useState([]);

  useEffect(() => {
    const TestUrls = async () => {
      //let array = await obtenerArrayNombresIMGV2();
      //let array2 = await obtenerUrlsIMG(array);
      let array3 = await servicionTestUrls();

      //let url = await obtener1IMG();
      //console.log(url);
      setUrl(array3);

      return url;
    };
    //TestUrls();
    //console.log(" URL DEVUELTA", TestUrls());
  }, []);

  return (
    <div>
      <header>{nav}</header>
      <main>
        <div className="contenedor-principal">
          <div className="grupo-sliders">
            {/*slider1*/}
            {/*sliders*/}
            {/*TEST DE API */}
            {/*<img src={url[0]} className="slider-img"></img>*/}
            {/*<img src={imagenDelServer[0]} className="slider-img"></img>*/}

            {/*SliderAPI*/}
            <h2>Autos Chicos</h2>
            {sliderAutosChicos}
          </div>
          <div className="grupo-sliders">
            <h2>Autos Medianos</h2>
            {sliderAutosMedianos}
          </div>
          <div className="grupo-sliders">
            <h2>Autos Grandes</h2>
            {sliderAutosGrandes}
          </div>
          <div className="grupo-sliders">
            <h2>Autos Premiun</h2>
            {sliderAutosPremiun}
          </div>
          <div className="grupo-sliders">
            <h2>Camionetas</h2>
            {sliderCamionetas}
          </div>
          <div className="grupo-sliders">
            <h2>Vans</h2>
            {sliderVans}
          </div>
        </div>
      </main>
    </div>
  );
}
