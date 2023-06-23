import "./registroUsuario.css";

import { crearSeccionYcookie } from "../services/service";
import { servicioLogin } from "../services/service";

async function procesarFormulario(e, cookieApp, setCookieAPP) {
  e.preventDefault();

  let h3Test = document.getElementById("H3-TEST");
  let numeroTargets = e.target;
  const data = {
    selector: "Cuentas",
    email: numeroTargets[0].value,
    contraseña: numeroTargets[1].value,
  };

  let estadoLogin = await servicioLogin(
    data.selector,
    data.email,
    data.contraseña
  );

  if (estadoLogin.estado === false) {
    alert(estadoLogin.mensaje);
    h3Test.hidden = false;
    h3Test.innerHTML = estadoLogin.mensaje;
  } else {
    await crearSeccionYcookie(
      cookieApp,
      setCookieAPP,
      estadoLogin.mensaje[0].username,
      estadoLogin.mensaje[0].role
    );

    alert("LOGIN EXITOSO!");
    //h3Test.hidden = false;
    h3Test.innerHTML = "LOGIN EXITOSO!";
  }
}

export function Login(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;
  const cookieApp = estado.cookie;
  const setCookieAPP = estado.setCookie;
  const verificacionLogin = () => {
    if (cookieApp !== false) {
      return <h3 id="H3-TEST">Ya ESTAS LOGEADO</h3>;
      //
    } else {
      return (
        <form
          id="mi-formulario"
          onSubmit={(e) => procesarFormulario(e, cookieApp, setCookieAPP)}
        >
          <ul id="ListaFormulario">
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
              id="Contraseña"
              placeholder="tu contraseña"
              required
            />

            <input
              className="botonSubmit"
              type="submit"
              value="Continuar"
              id="BotonSubmit"
            ></input>
          </ul>
        </form>
      );
    }
  };

  return (
    <div>
      <header>
        <div>{nav}</div>
      </header>
      <main id="Test">
        <section className="Formulario">
          <h4>Login</h4>
          {verificacionLogin()}
        </section>
      </main>
    </div>
  );
}
