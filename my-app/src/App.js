import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { boton, botonV2, eventos, mostratDatosTest, eventosV2 } from "./ui/ui";
import { obtenerDatosIniciales } from "./services/service";
import { obtenerDatosAPI } from "./selector api/api";
import { Nav } from "./componentes/nav";
import {
  DatosMain,
  DatosMain2,
  DatosMainFinales,
  SoloFlag,
  soloFlag,
} from "./componentes/main";
import { DatosHeader } from "./componentes/header";
import { DatosFooter } from "./componentes/footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/home";
import { About } from "./paginas/about";
import { Default } from "./paginas/default";
import { Layount } from "./paginas/layount";
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
//ESTO ES MUY BUENO; AHORA VAMOS A EXPLICAR QUE ES ESTO
//mi concepcion de react, era confunsa, react no funciones, mira FUNTION APP
//es una pta funcion, y como tal, podes usarla asi, pero con algunas cositas de mas, pero, deja de tratarla
//como algo especial y trabaja como una funcion, aca abajo tenes unos ejemplos, la usamos como una funcion
//"normal" y hacemos que pase todo lo que queremos, como queremos
function SelectorTEST(estado) {
  const estadoMenu = estado.estado;
  const setEstado = estado.set;
  if (estadoMenu) {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado}></Nav>
        </header>
        <main>
          {DatosMainFinales(estadoMenu)}
          <Routes>
            <Route path="/" element={Layount()}>
              <Route path="/" element={Home()}></Route>
              <Route path="/About" element={About()}></Route>
              <Route path="*" element={Default()}></Route>
            </Route>
          </Routes>
        </main>
        <footer></footer>
      </>
    );
  } else {
    return (
      <>
        <header>
          <Nav estado={estadoMenu} set={setEstado}></Nav>
          <DatosHeader></DatosHeader>
        </header>
        <main>
          <div id="TEST">{}</div>
          <main>{DatosMainFinales(estadoMenu)}</main>
        </main>
        <footer>
          <DatosFooter></DatosFooter>
        </footer>
      </>
    );
  }
}
function logTest(log) {
  const mensaje = console.log("MENSAJE ", log);
  return mensaje;
}
function TestEstadosAjenos(props) {
  const estado = props.test;
  const setEstado = props.set;
  /*
  if (props.test === true) {
    console.log("DATO CORRECTO");
  }
  */
  console.log("ESTADO TEST", estado);
  //const log = logTest(" hola");
  let test = "test";

  return (
    <div>
      {props.test}
      <button
        onClick={() => setEstado(!estado)}
        type="button"
        className="btn btn-primary"
        id="menu-Desplegable"
      >
        BOTON TEST
      </button>
    </div>
  );
}

//Hagamos una nueva funcion de control, que deje activo el menu cuando toquemos el boton de menu
//y lo quite cuando lo volvamos a tocar
//de la siguiente manera, cuando toquemos el boton de listaDesplegable, cambiamos el estado a true
//y cuando lo toquemos otra vez, a false
function App() {
  useEffect(() => {
    //inicializador("DATOS DE TEST");
    //inicializador();
    //let jsonselector = otrafuncion();
    //console.log(" el log", otrafuncion());
  });
  //boton();
  const [estado, setEstado] = useState(false);
  const [estadoMenu, setEstadoMenu] = useState(false);
  //id="menu-Desplegable"
  console.log("ESTADO INTERNO", estadoMenu);

  return (
    <div
      className="App"
      //onClick={(e) => eventosV2(e.target, estado, setEstado)}
    >
      <h1>RUTAS</h1>
      {/*TestEstadosAjenos()*/}
      {/*console.log(estadoMenu)*/}
      {/*Nav(estadoMenu)*/}
      {/*<TestEstadosAjenos test={estadoMenu} set={setEstadoMenu} />*/}
      <SelectorTEST estado={estadoMenu} set={setEstadoMenu}></SelectorTEST>
      {/*
      <header>
        <Nav estado={estadoMenu} set={setEstadoMenu}></Nav>
      </header>

  {selectorTEST(estadoMenu)}*/}
    </div>
  );
}

export default App;
