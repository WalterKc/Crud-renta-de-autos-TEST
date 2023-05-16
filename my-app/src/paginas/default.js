export function Default(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const setPagina = estado.setPagina;

  //setPagina("default");
  console.log("pagina Actual", paginaActual);

  return <h1>default</h1>;
}
