import "./registroUsuario.css";
export function RegistroUsuarios(estado) {
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
          <h4>Registro</h4>
          <form>
            <ul id="test">
              <label>nombre:</label>
              <input
                className="inputs"
                type="text"
                id="nombre"
                placeholder="nombre de usuario"
              />
              <label>Contraseña:</label>
              <input
                className="inputs"
                type="password"
                id="contraseña"
                placeholder="tu contraseña"
              />
              <label>numero de telefono</label>
              <input
                className="inputs"
                type="number"
                id="numeroTelefono"
                placeholder="tu numero de telefono"
              />
              <p>
                Estoy de acuerdo con los <a href="#">Terminos y condiciones</a>
              </p>

              <input
                className="botonSubmit"
                type="submit"
                value="enviar datos(sin funcion por ahora)"
              ></input>
              <p>
                <a href="/Login">¿Ya tengo cuenta?</a>
              </p>
            </ul>
          </form>
        </section>
      </main>
    </div>
  );
}
