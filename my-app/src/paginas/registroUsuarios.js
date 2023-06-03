import { servicioRegistro } from "../services/service";
import "./registroUsuario.css";
//vamos a hacer lo mismo con el registro de usuarios
//tengo que poner algun tipo de autoincrement para el id, si o si, luego, ya no tengo que modificar
//mas la base de datos, al menos , no tanto
async function procesarFormulario(e) {
  e.preventDefault();
  let h3Test = document.getElementById("H3-TEST");

  let numeroTargets = e.target;
  const data = {
    selector: "Cuentas",
    nombreUsuario: numeroTargets[0].value,
    email: numeroTargets[1].value,
    contraseña: numeroTargets[2].value,
    telefono: numeroTargets[3].value,
  };
  const estadoRegistro = await servicioRegistro(
    data.selector,
    data.email,
    data.contraseña,
    data.nombreUsuario,
    data.telefono
  );

  if (estadoRegistro.estado === false) {
    alert(estadoRegistro.mensaje);
    h3Test.hidden = false;
    h3Test.innerHTML = estadoRegistro.mensaje;
  } else {
    alert("Registro EXITOSO!");
    h3Test.hidden = false;
    h3Test.innerHTML = "LOGIN EXITOSO!";
  }
}

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
          <form id="mi-formulario" onSubmit={(e) => procesarFormulario(e)}>
            <ul id="test">
              <label>nombre:</label>
              <input
                className="inputs"
                type="text"
                id="nombre"
                placeholder="nombre de usuario"
                required
              />
              <label>email:</label>
              <input
                className="inputs"
                type="email"
                id="email"
                placeholder="tu email"
                required
              />
              <label>Contraseña:</label>
              <input
                className="inputs"
                type="password"
                id="contraseña"
                placeholder="tu contraseña"
                required
              />
              <label>numero de telefono</label>
              <input
                className="inputs"
                type="number"
                id="numeroTelefono"
                placeholder="tu numero de telefono"
                required
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
