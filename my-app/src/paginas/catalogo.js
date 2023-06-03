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
  const nav = estado.Nav;

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
