const BASE_URL = "http://localhost:8080";
const IP_GENERAL = "http://192.168.0.3:8080";
const urlTest = "http://localhost:8080/TEST_EMAIL";
const datosTest = {
  selector: "Cuentas",
  email: "email@ejemplo2.com",
};

//export const LIMITE_POKEMONES = 20;
//ok,
export async function obtenerDatosAPI() {
  return (await fetch(BASE_URL)).json();
}
//sin uso, se borra
export async function obtenerDatosLoginTest() {
  return (await fetch(urlTest),
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosTest),
  }).json();
}

const urlLoginTemporal = `${IP_GENERAL}/TEST_LOGIN1`;
const urlRegistroTemporal = `${IP_GENERAL}/TEST_REGISTRO1`;
//OK
export async function estadoDeLogin(cuenta, email, contraseña) {
  const dataInterna = {
    selector: cuenta,
    email: email,
    contraseña: contraseña,
  };
  //aca tengo que pasar los datos, mas tarde voy a hacer la contraseña
  const response = await fetch(urlLoginTemporal, {
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
//OK
export async function estadoDeRegistro(
  cuenta,
  email,
  contraseña,
  nombre,
  telefono
) {
  const dataInternaV2 = [
    {
      selector: cuenta,
      email: email,
    },
    {
      nombreUsuario: nombre,
      rol: "guest",
      telefono: telefono,
      email: email,
      contraseña: contraseña,
    },
  ];
  const response = await fetch(urlRegistroTemporal, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInternaV2),
  });
  const result = await response.json();
  console.log(result[0]);
  return result;
}

//API DE IMAGENES, son 2 funciones, 1 la api en si, y otra de apoyo
const UrlIMGTEST1 = `${IP_GENERAL}/TEST_IMAGENES`;
const UrlIMGTEST1V2 = `${IP_GENERAL}/TEST_IMAGENESV2`;

const UrlIMGTEST2 = `${IP_GENERAL}/Imagenes-Autos/`;
const UrlIMGTEST2V2 = `${IP_GENERAL}/`;

//obtiene el nombre de las imagenes
//OK
async function obtenerNombresIMGs() {
  const nombres = (await fetch(UrlIMGTEST1)).json();
  return nombres;
}
//obtiene las  urls de las imagenes
//Funciones viejas, LAS V2 son las buenas
export async function obtenerUrlsIMG() {
  let nombre = await obtenerNombresIMGs();
  let urls = [];
  for (let x = 0; x < nombre.length; x++) {
    urls.push(UrlIMGTEST2 + nombre[x]);
  }
  return urls;
}
async function obtenerNombresIMGsV2() {
  //esto retorna un json, asi que guarda
  const nombres = (await fetch(UrlIMGTEST1V2)).json();
  return nombres;
}
//obtiene las  urls de las imagenes
//OK
export async function obtenerUrlsIMGV2() {
  //array Json
  let nombre = await obtenerNombresIMGsV2();

  let urlParciales = [];
  let keys = [];
  let urlsFinales = {};

  for (let k = 0; k < Object.keys(nombre).length; k++) {
    keys.push(Object.keys(nombre)[k]);
    urlParciales.push([]);
    for (let v = 0; v < Object.values(nombre)[k].length; v++) {
      urlParciales[k].push(
        `${UrlIMGTEST2V2}${Object.keys(nombre)[k]}/${
          Object.values(nombre)[k][v]
        }`
      );
    }
  }

  keys.forEach(function (k1, v1) {
    urlsFinales[k1] = urlParciales[v1];
  });

  return urlsFinales;
}
obtenerUrlsIMGV2();

//API de sincronia y verificancion de login
const urlcoockie1 = `${IP_GENERAL}/sessionesV2`;
//esta url es la erronea , para preguntar
const urlcoockie2 = `${IP_GENERAL}/cookie`;
const testSeccion = `${IP_GENERAL}/seccionesTestCookie`;
const testEliminoSeccion = `${IP_GENERAL}/eliminoSeccion`;
const obtenerAutos = `${IP_GENERAL}/Autos`;
const TransaccionesTest = `${IP_GENERAL}/TransaccionesTest`;
//
//OK
export async function enviarDatosSeccion(usuario, rol, email) {
  //
  const dataInterna = {
    usuario: usuario,
    rol: rol,
    email: email,
  };
  //aca tengo que pasar los datos, mas tarde voy a hacer la contraseña
  const response = await fetch(urlcoockie1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
//esta funcion de aca abajo tiene un error, no se va a usar por encontrar un nuevo metodo
//pero hay que arreglarla
export async function setCookie() {
  const response = await fetch("http://192.168.0.3:8080/cookie", {
    method: "GET",
    //body: JSON.stringify(dataInterna),
    credentials: "include",
    /*
    headers: {
      "Content-Type": "application/json",
    },
    */
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
//OK
export async function verificoSeccionAPI() {
  const dataInterna = {
    cookie: document.cookie,
  };
  const response = await fetch(testSeccion, {
    method: "POST",
    //body: JSON.stringify(dataInterna),
    credentials: "same-origin",
    "Set-Cookie": document.cookie,

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
//OK
export async function eliminoSeccionApi() {
  const dataInterna = {
    cookie: document.cookie,
  };
  const response = await fetch(testEliminoSeccion, {
    method: "POST",
    //body: JSON.stringify(dataInterna),
    credentials: "same-origin",
    "Set-Cookie": document.cookie,

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  //console.log(result);
  return result;
}
//obtengo datos de los autos
export async function obtenerAutosAPI() {
  const response = await fetch(obtenerAutos, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

//transacciones V1
export async function TransaccionesApiAutos(datos) {
  const dataInterna = {
    cookie: document.cookie,
    autos: datos.autos, //esto esta mokeado, en la version real, es un array de la app
    fechaDeDevolucion: datos.fechaDeDevolucion,
  };
  const response = await fetch(TransaccionesTest, {
    method: "POST",
    credentials: "same-origin",
    "Set-Cookie": document.cookie,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInterna),
  });
  const result = await response.json();
  return result;
}

//el resto de apis va aca abajo(cuando se me ocurran o sean necesarios)
