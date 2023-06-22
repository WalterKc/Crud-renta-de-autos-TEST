import { obtenerAutos } from "../services/service";
import { useState } from "react";
import { useEffect } from "react";
import "./catalogo.css";
export function Catalogo(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
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
  const estadoSliders = estado.sliderGeneralEstado;
  const estadoBotones = estado.estadoBotones;
  const imagenesOrdenadas = estado.imagenesOrdenadas;

  const nav = estado.Nav;
  //
  const [datosAutosV2, setDatosAutosV2] = useState();
  const [Vans, setVans] = useState();
  const [Premiun, setPremiun] = useState();
  const [Chicos, setChicos] = useState();
  const [Medianos, setMedianos] = useState();
  const [Grandes, setGrandes] = useState();
  const [Camionetas, setCamionetas] = useState();
  const [unaVez, setUnaVez] = useState(false);
  const [selectorModal, setSelectorModal] = useState();

  const autos = async () => {
    const autos = await obtenerAutos();
    console.log("ESTOS SON LOS AUTOS", autos.Camionetas);
    setDatosAutosV2(autos);

    setVans(autos.Vans[1]);
    setPremiun(autos.Premiun[1]);
    setChicos(autos.Chicos[1]);
    setMedianos(autos.Medianos[1]);
    setGrandes(autos.Grandes[1]);
    setCamionetas(autos.Camionetas[1]);
    console.log("CAMIONETAS del server", autos.Grandes[1]);

    //return [Object.keys(autos.vans[0]), Object.values(autos.vans[0])];
  };
  const modalCambianteV2 = (algo) => {
    //hay que hacer el selector externo y ya

    console.log("Vans ", Vans);
    if (algo === undefined) {
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

            {/*<p>{eval(algo).Marca}</p>*/}

            <form method="dialog">
              {/*<button onClick={() => unModal.close()}>OK</button>*/}
              <button>OK</button>
            </form>
            {/*<button id="cerrarModal">Cerrar</button>*/}
          </dialog>
        </div>
      );
    }
  };

  useEffect(() => {
    const imagenes = async () => {
      const unModal = document.querySelector("#modal");

      const imagenSlider = document.querySelectorAll(".seccion-slider"); //la imagen 1 es la principal siempre
      const imagenpadre = document.querySelectorAll(".slider");

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
      console.log("ESTADO SELECCION Chicos", Chicos);
      console.log("ESTADO SELECCION Medianos", Medianos);
      console.log("ESTADO SELECCION Grandes", Grandes);
      console.log("ESTADO SELECCION Camionetas", Camionetas);

      window.onclick = function (event) {
        if (event.target === unModal) {
          unModal.close();
        }
      };
    };
    imagenes();
  }, [estadoSliders]);
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
  useEffect(() => {
    const cargarAutos = async () => {
      await autos();
    };
    cargarAutos();
  }, [imagenesOrdenadas]);
  useEffect(() => {
    console.log("ESTADO BOTONES Y CARGA", estadoBotones);

    rotoinjeccionaxialV3(estadoBotones, datosAutosV2, unaVez, setUnaVez);
  }, [datosAutosV2, estadoBotones]);

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
        {modalCambianteV2(selectorModal)}
      </main>
    </div>
  );
}
