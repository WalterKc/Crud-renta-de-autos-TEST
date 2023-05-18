export function Reservas(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;

  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      <main id="Test">ES NECESARIO CUENTA PARA VER PEDIR RESERVA</main>
    </div>
  );
}
