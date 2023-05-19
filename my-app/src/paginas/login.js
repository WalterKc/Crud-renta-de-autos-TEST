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
/**
 * NO puedo buscar el id, por que es algo que el user no sabe
 * No puedo buscar por el nombre, ni la contraseña, podrian ser repetidos
 * PUEDO buscar por el email, el email es unico (lo voy a forzar asi, es logico)
 * asi que, vamos a tener que modificar ligeramente el control de sql para que busque por email
 * en ves de id
 *
 */
import { obtenerDatosLoginTest } from "../selector api/api";
import { obtenerDatosIniciales } from "../services/service";
import { object } from "rsdi";
async function testDeDatos() {
  let datos = await obtenerDatosLoginTest();
  console.log(datos);
}
/** */
const data = {
  selector: "Cuentas",
  email: "email@ejemplo2.com",
};
const urlTest = "http://localhost:8080/TEST_EMAIL";

async function testDeDatos2() {
  const response = await fetch(urlTest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result[0]);
  return result[0];
}
const otrafuncion = async () => {
  let datos = await obtenerDatosIniciales();
  console.log(datos[0]);
  return datos;
};
async function logExtra(objeto) {
  const dato = await objeto;
  console.log(Object.keys(dato));
  return Object.keys(dato);
}
/** */

async function procesarFormulario(e) {
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
  console.log("DATOS DE LA API/SERVER TEST", await logExtra(testDeDatos2()));
}

export function Login(estado) {
  const paginaActual = estado.paginaActual;
  console.log("pagina Actual", paginaActual);
  const nav = estado.Nav;

  return (
    <div>
      <header>
        <div>{nav}</div>
        <div>{}</div>
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
              <label>email:</label>
              <input
                className="inputs"
                type="email"
                id="email"
                placeholder="tu email"
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
