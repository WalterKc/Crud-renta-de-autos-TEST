import { SliderGeneral } from "../App";

export function Catalogo(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const sliders = estado.Sliders;
  const slider1 = estado.Slider1;

  /*
  const imagenes = estado.imagenes;
  const setBotones = estado.setBotones;
  const estadoBotones = estado.estadoBotones;
  */
  const nav = estado.Nav;

  return (
    <div>
      <header>{nav}</header>
      <main>
        <div className="contenedor-principal">
          <div className="grupo-sliders">
            {slider1}
            {sliders}

            <p>slider3</p>
          </div>
          <div className="grupo-sliders">
            <p>slider4</p>
            <p>slider5</p>
            <p>slider6</p>
          </div>
          <div className="grupo-sliders">
            <p>slider7</p>
            <p>slider8</p>
            <p>slider9</p>
          </div>
          <div className="grupo-sliders">
            <p>slider10</p>
            <p>slider11</p>
            <p>slider12</p>
          </div>
          <div className="grupo-sliders">
            <p>slider13</p>
            <p>slider14</p>
            <p>slider15</p>
          </div>
          <div className="grupo-sliders">
            <p>slider16</p>
            <p>slider17</p>
            <p>slider18</p>
          </div>
        </div>
      </main>
    </div>
  );
}
