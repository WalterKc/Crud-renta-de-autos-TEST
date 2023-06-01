export const BASE_URL = "http://localhost:8080";
const IP_GENERAL = "http://192.168.0.3:8080";
const urlTest = "http://localhost:8080/TEST_EMAIL";
const datosTest = {
  selector: "Cuentas",
  email: "email@ejemplo2.com",
};

//export const LIMITE_POKEMONES = 20;
export async function obtenerDatosAPI() {
  return (await fetch(BASE_URL)).json();
}

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
//api de login General
//llamo a la api del login aca, pero no hace nada
//OK; ACA VA MI IP, o la lo que haga del servidor, pero como es algo inicial, lo vamos a dejar
//hardcoreado por ahora
const urlLoginTemporal = `${IP_GENERAL}/TEST_LOGIN1`;
const urlRegistroTemporal = `${IP_GENERAL}/TEST_REGISTRO1`;

export async function mensajeDeLogin(cuenta, email, contraseña) {
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
export async function mensajeDeRegistro(
  cuenta,
  email,
  contraseña,
  nombre,
  telefono
) {
  //el rol siempre es guest, para que cualquiera no pueda mandar lo que quiera
  //aunque, tecnicamente, nada lo impide por medio del server,pero por ahora, lo voy a dejar asi
  /*
  const dataInterna = {
    selector: cuenta,
    nombreUsuario: nombre,
    email: email,
    rol: "guest",
    contraseña: contraseña,
    telefono: telefono,
  };
  */
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
  //aca tengo que pasar los datos, mas tarde voy a hacer la contraseña
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
async function obtenerNombresIMGs() {
  const nombres = (await fetch(UrlIMGTEST1)).json();
  return nombres;
  //await nombres.forEach((autos) => console.log("AUTOSSSSS", autos));
  //arrayNombres.push(file);
}
//obtiene las  urls de las imagenes
export async function obtenerUrlsIMG() {
  let nombre = await obtenerNombresIMGs();
  let urls = [];
  for (let x = 0; x < nombre.length; x++) {
    //console.log(nombre);
    //console.log(x);
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
export async function obtenerUrlsIMGV2() {
  //array Json
  let nombre = await obtenerNombresIMGsV2();

  let urlParciales = [];
  let keys = [];
  let urlsFinales = {};
  //aca es necesario 2 o 3 bucles
  //K de key, v de Value
  for (let k = 0; k < Object.keys(nombre).length; k++) {
    //console.log(nombre);
    //console.log(x);
    keys.push(Object.keys(nombre)[k]);
    urlParciales.push([]);
    for (let v = 0; v < Object.values(nombre)[k].length; v++) {
      /*console.log(
        "URLS PARCIALES ",
        `${UrlIMGTEST2V2}${Object.keys(nombre)[k]}/${
          Object.values(nombre)[k][v]
        }`
      );*/
      /*
      console.log(
        "URLS Totales ",
        "KEY ",
        Object.keys(nombre)[k],
        "VALUE ",
        `${UrlIMGTEST2V2}${Object.keys(nombre)[k]}/${
          Object.values(nombre)[k][v]
        }`
      );*/

      //console.log("CONTADOR URLS TEST", "KEY ", k, "VALUE ", v);

      urlParciales[k].push(
        `${UrlIMGTEST2V2}${Object.keys(nombre)[k]}/${
          Object.values(nombre)[k][v]
        }`
      );
      //console.log("KEYS ", keys);

      //urlParciales[k].push(v);
    }
  }

  keys.forEach(function (k1, v1) {
    urlsFinales[k1] = urlParciales[v1];
  });

  //console.log("KEYS ", keys);
  //console.log("URLS Parciales", urlParciales);

  //console.log("URLS FINALES", urlsFinales);
  return urlsFinales;
}
obtenerUrlsIMGV2();
/**
 * curiosidad, esto deletrea las letras XD, no lo buscaba, pero me lo guardo
 * console.log(
        "URLS PARCIALES ",
        `${UrlIMGTEST2V2}${Object.keys(nombre)[0]}/${Object.values(
          Object.keys(nombre)[1]
        )}`
      );

  //este tambien
  for (let v = 0; v < Object.values(Object.keys(nombre)[k]).length; v++) {
      console.log(
        "URLS PARCIALES ",
        `${UrlIMGTEST2V2}${Object.keys(nombre)[0]}/${Object.values(
          Object.values(nombre)[0][0]
        )}`
      );
 */

//API de sincronia y verificancion de login
//traigo las funciones de el area de test *LISTO*
//hay que modificarlas ,por que no son muy convenientes ahora(aunque funcionales)
//recorda que el envio de datos y el retorno es al mismo tiempo, por lo que van que compartir servicio
//hay que recordar que, solo se puede setear la cookie cuando no existe una
const urlcoockie1 = `${IP_GENERAL}/sessionesV2`;
const urlcoockie2 = `${IP_GENERAL}/cookie`;
const testSeccion = `${IP_GENERAL}/seccionesTestCookie`;
const testEliminoSeccion = `${IP_GENERAL}/eliminoSeccion`;
export async function enviarDatosSeccion(usuario, rol) {
  //
  const dataInterna = {
    usuario: usuario,
    rol: rol,
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

//el resto de apis va aca abajo(cuando se me ocurran o sean necesarios)
