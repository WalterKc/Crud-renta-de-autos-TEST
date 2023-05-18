import "./registroUsuario.css";

/**
 * ok, aca lo que tenemos que hacer es facil, vamos a buscar al user paulhal, vamos a darle contraseña
 * y un nombre de user unico/email/telefono, es necesario modificar/crear algunas cosas  en la base
 * de datos, pero son cosas que ya hicimos ,asi que no va a ser dificil
 * tambien hay que poner comprobaciones aca y el la base de datos,
 * esto es algo que va a pasar siempre, y es parte de una aplicacion real, asi que, hasta que no este
 * completo al 100%, no vamos a avanzar,
 * acortade que hay que usar las funciones de la api/servicio para esto
 * tambien, que despues de esto, hay que hacer una limpieza general de todas las funciones de test
 * por que son molestas ya
 *
 */
function procesarFormulario(e) {
  e.preventDefault();
  var miFormulario = document.getElementById("mi-formulario");
  var datosEnviados = miFormulario.elements.Nombre.value;
  let numeroTargets = e.target;

  // Procesar los datos enviados aquí
  console.log(datosEnviados);
  console.log(numeroTargets.length);
  console.log(numeroTargets[0]);
  console.log(numeroTargets[1]);
  console.log(numeroTargets[2]);
}

export function Login(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;

  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      <main id="Test">
        <section className="Formulario">
          <h4>Login</h4>
          <form id="mi-formulario" onSubmit={(e) => procesarFormulario(e)}>
            <ul id="ListaFormulario">
              <label>nombre:</label>
              <input
                className="inputs"
                type="text"
                id="Nombre"
                placeholder="nombre de usuario"
              />
              <label>Contraseña:</label>
              <input
                className="inputs"
                type="password"
                id="Contraseña"
                placeholder="tu contraseña"
              />

              <input
                className="botonSubmit"
                type="submit"
                value="enviar datos(sin funcion por ahora)"
              ></input>
            </ul>
          </form>
        </section>
      </main>
    </div>
  );
}
