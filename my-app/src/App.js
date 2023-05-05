import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { mostratDatosTest } from "./ui/ui";
import { obtenerDatosIniciales } from "./services/service";
import { obtenerDatosAPI } from "./selector api/api";
async function inicializador() {
  mostratDatosTest(await obtenerDatosIniciales());
}
async function otroTEST(valor) {
  return await valor;
}
const test1 = otroTEST(obtenerDatosIniciales());
const test2 = obtenerDatosIniciales();
console.log(test1);
//al use effect no le gusta nada, todo se tiene que hacer afuera para que se vean los resultados
const otrafuncion = async () => {
  let datos = await obtenerDatosIniciales();
  console.log(datos[0]);
  return datos;
};

function App() {
  useEffect(() => {
    //inicializador("DATOS DE TEST");
    inicializador();
    //let jsonselector = otrafuncion();
    console.log(" el log", otrafuncion());
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div id="TEST">EEEEEEEEEOOOOOOOOOOOOOOOOOOO</div>
    </div>
  );
}

export default App;
