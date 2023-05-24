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
 * OK, ya funciona el login , a medio gas, falta vincular la contraseña, lo vamos a hacer ahora
 * luego de eso, el login, en codigo, va a estar completo, a menos los datos, pero falta las seciones y
 * eso mas tarde, pero eso es mas secundario
 * para hacer esto, hay que modificar un poco la base de datos, y ponerle la contraseña
 * vamos a tener que modificar todos las funciones que tocan las cuentas, pero, como solo
 * solo hay que agregar 1 campo, va a ser facil
 *
 * OK,NO TE MATES,HAY UN PROBLEMA CON EL SERVIDOR CUANDO SE USA POR EL CELULAR, PERO, ESO NO ES MALO
 * ES ALGO QUE SEGURO ES POR COMO ESTAMOS DEPLOYANDO ESTO, POR LO QUE, NO TE MATES EN SOLUCIONARLO
 * PERO ES BUENO QUE LO SEPAS
 */
import { obtenerDatosLoginTest } from "../selector api/api";
import { obtenerDatosIniciales } from "../services/service";
import { servicioTestLogin } from "../services/service";

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
const urlTest2 = "http://localhost:8080/TEST_LOGIN1";

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
async function testDeDatos3(cuenta, email, contraseña) {
  const dataInterna = {
    selector: cuenta,
    email: email,
    contraseña: contraseña,
  };
  //aca tengo que pasar los datos, mas tarde voy a hacer la contraseña
  const response = await fetch(urlTest2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  console.log(result[0]);
  return result;
}
/** */

async function procesarFormulario(e) {
  e.preventDefault();

  //var miFormulario = document.getElementById("mi-formulario");
  let h3Test = document.getElementById("H3-TEST");
  //var datosEnviados = miFormulario.elements.Nombre.value;
  let numeroTargets = e.target;
  const data = {
    selector: "Cuentas",
    email: numeroTargets[0].value,
    contraseña: numeroTargets[1].value,
  };
  //alert(Object.values(data));

  let estadoLogin = await servicioTestLogin(
    data.selector,
    data.email,
    data.contraseña
  );

  // Procesar los datos enviados aquí
  //console.log(datosEnviados);
  console.log(numeroTargets.length);
  console.log(numeroTargets[0]);
  console.log("CONTRASEÑA ", numeroTargets[1].value);
  console.log("email del form ", numeroTargets[0].value);
  console.log("DATOS DE LA API/SERVER TEST", estadoLogin);
  console.log("ESTADO", estadoLogin.estado);
  console.log("MENSAJE ", estadoLogin.mensaje[0]);
  if (estadoLogin.estado === false) {
    alert(estadoLogin.mensaje);
    h3Test.hidden = false;
    h3Test.innerHTML = estadoLogin.mensaje;
  } else {
    alert("LOGIN EXITOSO!");
    h3Test.hidden = false;
    h3Test.innerHTML = "LOGIN EXITOSO!";
  }
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
        <h3 id="H3-TEST" hidden></h3>
        <section className="Formulario">
          <h4>Login</h4>
          <form id="mi-formulario" onSubmit={(e) => procesarFormulario(e)}>
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
                value="enviar datos(sin funcion por ahora)"
                id="BotonSubmit"
              ></input>
            </ul>
          </form>
        </section>
      </main>
    </div>
  );
}
