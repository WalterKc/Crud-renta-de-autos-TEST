export function Default(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;

  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      <main id="Test">ESTA PAGINA NO EXISTE</main>
    </div>
  );
}
