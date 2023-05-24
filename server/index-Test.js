//aca van las direcciones
//vamos a jugar un poco con las cuentas, y vasmos a convertiral en api, y luego en sql, esa va a ser mi
//ojetivo aca
//ya se muestran las cuentas, no voy a perder el tiempo en volver a practicar, vamos a convertirlas en sql
const {
  todo,
  selecciono_1_tabla,
  selecciono_un_ID_en_particular,
  //inserto_un_nuevo_objeto,
  //elimino_un_objeto_particular,
  crearUsusario,
  eliminoCliente,
  muestro_tabla,
  seleccionarID,
  comprobarId,
  modificoCliente,
  db,
  modificoAuto,
  crearAuto,
  eliminoAuto,
  eliminarFilaDeTabla,
  updateTEST,
  funcionDeApoyoPut_Indice,
  funcionDeApoyoPut_DatosNuevos,
  comprobarEMAIL,
  seleccionarEMAIL,
  comprobarContraseña,
  seleccionarContraseña,
  seleccionarContraseñaV2,
  comprobarContraseñaV2,
  crearUsusarioV2,
} = require("./controlSQL/control.js");
//import { todo } from "./controlSQL/control.js";

const express = require("express");
var cors = require("cors");
const session = require("express-session");
const { object } = require("rsdi");
const path = require("path");
const fs = require("fs");

const PUERTO = 8080;
const app = express();
app.use(cors());
app.use(express.json());
//test de seciones//
/*
app.use(
  session({
    secret: "123",
    resave: true,
    saveUninitialized: true,
  })
);
*/
const SqliteStore = require("better-sqlite3-session-store")(session);
//DESACTIVO ESTO POR QUE ES MOLESTO; ME LLENA LA CONSOLA
/* 
app.use(
  session({
    store: new SqliteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 10000, //ms = 30seg
      },
    }),
    key: "galleta",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
*/
/**
 * TEST INDEX
 */
var serveIndex = require("serve-index");
/**
 * TEST 2 INDEX
 */

let cuentas = [
  {
    id: 1,
    username: "paulhal",
    role: "admin",
  },
  {
    id: 2,
    username: "johndoe",
    role: "guest",
  },
  {
    id: 3,
    username: "sarahjane",
    role: "guest",
  },
];
// hay que usar algun tipo de selector aca
app.get("/", (req, res) => {
  //console.log(cuentas);
  console.log(" SQL", muestro_tabla("autos"));
  console.log(" SQL TABLA ", selecciono_1_tabla);
  console.log(" SQL ID 1 ", seleccionarID("autos", 1));
  //elimino_un_objeto_particular;
  //elimino();
  console.log(" SQL actualizado", muestro_tabla("autos"));

  res.json(muestro_tabla("autos"));
  comprobarId("autos", 1);
  res.end;
});
app.post("/", (req, res) => {
  crearUsusario([5, "martin", "gonzales"]);
  console.log(" XXXXXXXXXXXXXX");
  res.json(muestro_tabla("cuentas"));
});
app.delete("/", (req, res) => {
  eliminoCliente(5);
  console.log(" YYYYYYYYYYYYYYYY");
  res.json(muestro_tabla("cuentas"));
});
app.post("/Test", (req, res) => {
  console.log(req.body);
  const obj = req.body;
  console.log(" KEYS ", Object.keys(obj));
  console.log(" VALUES ", Object.values(obj));

  console.log(obj.id);

  comprobarId("cuentas", obj.id);
  console.log(" EL ID NO ESTA DISPONIBLE? ", comprobarId("cuentas", obj.id));

  res.send(req.body);
});
app.post("/Test2", (req, res) => {
  const datos = req.body;

  console.log("compruebo", comprobarId("cuentas", datos.id));
  if (comprobarId("cuentas", datos.id)) {
    res.send(`EL ID SELECIONADO NO ESTA DISPONIBLE elije otro por favor `);
  } else {
    crearUsusario(Object.values(datos));

    res.json(muestro_tabla("cuentas"));
  }
});
app.put("/test3", (req, res) => {
  //seleciono una cuenta
  const nuevosDatos = req.body;
  console.log("DATOS A MODIFICAR ", nuevosDatos[0].id);
  console.log(" COLUMNAS A MOD ", Object.values(nuevosDatos[1]));
  console.log(" NUEVOS DATOS ", Object.values(nuevosDatos[2]));
  //const DatosB = Object.values(nuevosDatos[2]);
  if (comprobarId("cuentas", nuevosDatos[0].id) === false) {
    //
    res.send(`EL ID SELECIONADO NO EXISTE elije otro por favor `);
  } else {
    modificoCliente(
      nuevosDatos[0].id,
      Object.values(nuevosDatos[1]),
      Object.values(nuevosDatos[2])
    );
    //res.send(nuevosDatos[0]);
    res.json(muestro_tabla("cuentas"));
  }

  //digo lo que quiero cambiar
  //doy los datos nuevos
  //hago el cambio y debuelvo la tabla otra vez
});
app.get("/sessiones", (req, res) => {
  (req.session.usuario = "gaston"),
    (req.session.rol = "admin"),
    (req.session.visitas = req.session.visitas ? ++req.session.visitas : 1);
  req.session.cookie.maxAge = 30000;
  //req.session.cookie.domain = "galleta";
  req.session.cookie.path = "/sessiones";
  console.log("DATOS SECION", req.session);
  res.send(
    `el usuario${req.session.usuario}, con el rol ${req.session.rol}, visito la pagina ${req.session.visitas} veces`
  );
});
//ok, mira, solo va a haber 3 tablas editables, y la de secciones, vamos a hacer shit, vamos a fijarlas
//y ya, no es como que van a cambiar, son fijas, el guest no puede tocar ninguna, el user sus cuentas y pedir un auto
//el admin puede tocar todas, las secciones son automaticas, no se tocan
app.get("/TEST_tablas", (req, res) => {
  let selector = req.body;
  console.log(" TEST SELECTOR", selector.selector);
  console.log(" SQL", muestro_tabla(selector.selector));

  //console.log(" SQL actualizado", muestro_tabla("autos"));

  //res.json(muestro_tabla("autos"));
  //comprobarId("autos", 1);
  //res.end;
  res.send(muestro_tabla(selector.selector));
});
app.get("/TEST_ID", (req, res) => {
  let selector = req.body;
  if (comprobarId(selector.selector, selector.id) === false) {
    //
    res.send(`EL ID SELECIONADO NO EXISTE elije otro por favor `);
  } else {
    console.log(
      ` SQL ID ${selector.id} `,
      seleccionarID(selector.selector, selector.id)
    );
    res.send(seleccionarID(selector.selector, selector.id));
  }
});
app.post("/TEST_EMAIL", (req, res) => {
  let selector = req.body;
  console.log("DATOS LLEGADOS DESDE EL FRONT", selector);

  if (comprobarEMAIL(selector.selector, selector.email) === false) {
    //
    res.send(`EL EMAIL SELECIONADO NO EXISTE elije otro por favor `);
  } else {
    console.log(
      ` SQL ID ${selector.email} `,
      seleccionarEMAIL(selector.selector, selector.email)
    );
    res.send(seleccionarEMAIL(selector.selector, selector.email));
  }
  //res.send(selector);
});
app.post("/TEST_LOGIN1", (req, res) => {
  //aca vamos a testear el login completo, vamos a enviar datos correctos y tiene que devolver
  //una señal de correcto, y tenermos que enviar datos inconrrectos, y devolver una señal de incorrecto
  // si esto funciona, listo, ya tenemos un login funcional por server
  //primero, hay que comprobar el email(por que, hay que saber a quien nos dirigimos), y luego la contraseña

  let selector = req.body;
  /**comprobamos el email */
  if (comprobarEMAIL(selector.selector, selector.email) === false) {
    //
    console.log("DATOS LLEGADOS DESDE EL FRONT", selector);

    res.send({
      mensaje: `EL Email SELECIONADO NO EXISTE elije otro por favor `,
      estado: false,
    });
    //si no pasa/existe, para aqui y envia un mensaje de error, caso contraio, pasa al la contraseña
  } else {
    console.log("DATOS LLEGADOS DESDE EL FRONT", selector);

    //comprovamos la contraseña, es ese email
    if (
      comprobarContraseñaV2(
        selector.selector,
        selector.contraseña,
        selector.email
      ) === false
    ) {
      // la contraseña falla/es inconrrecta
      res.send({
        mensaje: `La contraseña SELECIONADA Es incorrecta, elije otra por favor `,
        estado: false,
      });
    } else {
      console.log("DATOS LLEGADOS DESDE EL FRONT", selector);

      console.log(
        ` SQL ID ${selector.contraseña} `,
        seleccionarContraseñaV2(
          selector.selector,
          selector.contraseña,
          selector.email
        )
      );
      res.send({
        mensaje: seleccionarContraseñaV2(
          selector.selector,
          selector.contraseña,
          selector.email
        ),
        estado: true,
      });
    }

    console.log(
      ` SQL ID ${selector.email} `,
      seleccionarEMAIL(selector.selector, selector.email)
    );
    //res.send(seleccionarEMAIL(selector.selector, selector.email));
  }

  //res.send(selector);
});
app.post("/TEST_REGISTRO1", (req, res) => {
  const nuevosDatos = req.body;
  //no hay que verificar la id, ya que es autoincremental, pero, hay que verificar el email, solo eso
  //
  if (comprobarEMAIL(nuevosDatos[0].selector, nuevosDatos[0].email) === true) {
    //
    console.log("DATOS LLEGADOS DESDE EL FRONT", nuevosDatos);

    res.send({
      mensaje: `EL Email SELECIONADO YA ESTA EN USO, elije otro por favor `,
      estado: false,
    });
    //si existe, para aqui(por que no puede haber emails repetidos) y envia un mensaje de error
    //, caso contraio, pasa al la contraseña, la contraseña es libre, no hay limitantes
  } else {
    console.log("DATOS LLEGADOS DESDE EL FRONT", nuevosDatos);
    crearUsusarioV2(Object.values(nuevosDatos[1]));
    res.send({ mensaje: "Usuario Creado", estado: true });

    //
  }
});

//aca hay que hacer un selector, y con ese selector, pasar los datos necesarios para LAS 3 TABLAS
//este es el LA FUNCION PRINCIPAL, TIENE QUE ESTAR MUY BIEN ECHA, sino esta perfecta, no se va a avanzar
//luego hay que hacer lo mismo con las demas, pero va a ser un copy paste casi, luego de completar estas funciones
//vamos a hacer puro frot para tener una pagina completa(aunque fea al principio), en la guia a a decir como
//va a estar estrucutrada
//SELECTOR AUTOS LISTO, siguiente, el de cuentas(que es un copypaste casi)
app.post("/TEST_crear_datos", (req, res) => {
  //selector
  //el selector tiene que verificar 2 cosas, 1 que sea la tabla correcta, y otra es que los datos
  //enviados sean del tamaño adecuado (para que no se envien cosas incompletas)

  const nuevosDatos = req.body;
  console.log("DATOS A MODIFICAR ", nuevosDatos);
  console.log(" COLUMNAS A MOD ", Object.keys(nuevosDatos[1]));
  console.log(" NUEVOS DATOS ", Object.values(nuevosDatos[1]));
  /**
   * TEST SELECTOR
   */
  console.log(" Tabla ", Object.values(nuevosDatos[0]));
  //AUTOS
  if (
    nuevosDatos[0].tabla === "autos" &&
    Object.keys(nuevosDatos[1]).length === 9
  ) {
    console.log("es una tabla de autos");
    console.log("el tamaño de la tabla es", Object.keys(nuevosDatos[1]).length);
    console.log("tipo de tabla", nuevosDatos[0].tabla);
    //se cumple la condicion
    if (
      comprobarId(nuevosDatos[0].tabla, nuevosDatos[1].id) === false &&
      nuevosDatos[1].id > 0
    ) {
      console.log("DATOS NUEVOS ", Object.values(nuevosDatos[1]));

      crearAuto(Object.values(nuevosDatos[1]));
      console.log(`EL ID SELECIONADO esta disponible y es valido para ser un nuevo auto, es posible usarlo,
      se ha creado un nuevo auto`);

      res.send(muestro_tabla(nuevosDatos[0].tabla));
    } //
    else {
      res.send(
        `EL ID SELECIONADO ESTA SIENDO USADO POR OTRO AUTO O ES EL ID 0, ELIJE OTRO`
      );
    }
  } // CUENTAS
  else if (
    nuevosDatos[0].tabla === "cuentas" &&
    Object.keys(nuevosDatos[1]).length === 5
  ) {
    //se cumple la condicion

    if (
      comprobarId(nuevosDatos[0].tabla, nuevosDatos[1].id) === false &&
      nuevosDatos[1].id > 0
    ) {
      //
      console.log("DATOS NUEVOS ", Object.values(nuevosDatos[1]));
      console.log("es una tabla de cuentas");
      console.log("el tamaño de la tabla es");

      crearUsusario(Object.values(nuevosDatos[1]));
      console.log(`EL ID SELECIONADO esta disponible y es valido para ser un nuevo auto, es posible usarlo,
      se ha creado un nuevo auto`);

      res.send(muestro_tabla(nuevosDatos[0].tabla));
    } //
    else {
      res.send(
        `EL ID SELECIONADO ESTA SIENDO USADO POR OTRO USUARIO O ES EL ID 0, ELIJE OTRO`
      );
    }
  } // transacciones (esta tabla, puede llegar a cambiar, por que, al usar plata, tiene que tener
  // cosas extra, para que cualquiera no se meta y pida algo sin pagar)
  //esta es una trasaccion, pero como es algo que se puede dejar para mas adelante, lo voy a dejar para
  //el final
  else if (
    nuevosDatos[0].tabla === "transacciones" &&
    Object.keys(nuevosDatos[1]).length === 6
  ) {
    res.send("es una tabla de transacciones");
    console.log("es una tabla de transacciones");
    console.log("el tamaño de la tabla es");
  } else {
    res.send("no es una tabla valida");
    console.log("no es una tabla valida");
  }

  //const DatosB = Object.values(nuevosDatos[2]);
  /*
  if (comprobarId("cuentas", nuevosDatos[0].id) === false) {
    //
    res.send(`EL ID SELECIONADO NO EXISTE elije otro por favor `);
  } else {
    modificoCliente(
      nuevosDatos[0].id,
      Object.values(nuevosDatos[1]),
      Object.values(nuevosDatos[2])
    );
    //res.send(nuevosDatos[0]);
    res.json(muestro_tabla("cuentas"));
  }

  //digo lo que quiero cambiar
  //doy los datos nuevos
  //hago el cambio y debuelvo la tabla otra vez
  */
  //res.send("HECHO");
});

//este tambien necesita un selector, pero mas pequeño
//NUEVO, no es necesario tener separado esto, vamos a crear una nueva funcion y ya
app.delete("/TEST_delete", (req, res) => {
  let idAEliminar = req.body;
  // aca se seleciona los autos
  if (
    (idAEliminar[0].tabla === "autos" || idAEliminar[0].tabla === "cuentas") &&
    Object.keys(idAEliminar[0]).length === 1
  ) {
    //verificamos si exite ese id
    if (
      comprobarId(idAEliminar[0].tabla, idAEliminar[1].id) === true &&
      idAEliminar[1].id > 0
    ) {
      console.log(
        " TABLA DEL OBJETO A ELIMNAR",
        idAEliminar[0],
        " ID DEL OBJETO A ELIMNAR",
        idAEliminar[1]
      );
      eliminarFilaDeTabla(idAEliminar[1].id, idAEliminar[0].tabla);
      res.send(
        ` SE ELIMINO EL ${idAEliminar[0].tabla} DE ID  ${idAEliminar[1].id}`
      );
    } //no pasa
    else {
      res.send(" EL id NO EXISTE, o es un 0, por favor revisa ");
    }
  }
  // si no seleciono algo valido
  else {
    res.send(" no es una tabla valida ");
  }
  //aca se seleciona las cuentas
  //aca se selecionan las transaciones(para mas tarde)

  //res.json(muestro_tabla("cuentas"));
});
app.put("/TEST_PUT", (req, res) => {
  //seleciono un auto
  /**
   *  (nuevosDatos[0].tabla === "autos" &&
      Object.keys(nuevosDatos[1]).length > 0 &&
      Object.keys(nuevosDatos[1]).length < 10) ||
   */
  //seleciono una cuenta
  const nuevosDatos = req.body;
  let id = nuevosDatos[1].id;
  let tabla = nuevosDatos[0].tabla;
  let valoresDatosNuevos = Object.values(nuevosDatos[1]);
  let keysDatosNuevos = Object.keys(nuevosDatos[1]);
  //
  console.log("DATOS A MODIFICAR ", nuevosDatos[0].id);
  if (
    nuevosDatos[0].tabla === "cuentas" &&
    Object.keys(nuevosDatos[1]).length === 5
  ) {
    if (comprobarId(nuevosDatos[0].tabla, nuevosDatos[1].id) === true) {
      console.log("DATOS A MODIFICAR ", nuevosDatos[1].id);
      console.log(" COLUMNAS A MOD ", Object.values(nuevosDatos[1]));
      console.log(" NUEVOS DATOS ", Object.keys(nuevosDatos[1]));
      console.log("LARGO ", Object.keys(nuevosDatos[1]).length);
      //console.log("datos originales", tablaActual);
      console.log("KEYS A MOD ", Object.values(nuevosDatos[1]));
      //console.log("resultado ",Object.keys(tablaActual[0]) - Object.keys(nuevosDatos[1]));
      let indice = funcionDeApoyoPut_Indice(Object.values(nuevosDatos[1]));
      console.log(indice);
      let datosFinales = funcionDeApoyoPut_DatosNuevos(indice, nuevosDatos);
      console.log("tamaño datos externo", Object.values(nuevosDatos[1]).length);
      modificoCliente(id, keysDatosNuevos, datosFinales);
      let tablaActual = seleccionarID(tabla, id);
      /*
      var indices = [];
      var array = Object.values(nuevosDatos[1]);
      var element = null;
      var idx = array.indexOf(element);
      while (idx != -1) {
        console.log(idx);
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
      }
      console.log(indices);
      console.log(idx);
      */

      /*
      modificoCliente(
        nuevosDatos[1].id,
        Object.keys(nuevosDatos[1]),
        Object.values(nuevosDatos[1])
      );
      */
      //
      res.send(tablaActual);
    } else {
      /*
      modificoCliente(
        nuevosDatos[0].id,
        Object.values(nuevosDatos[1]),
        Object.values(nuevosDatos[2])
      );
      //res.send(nuevosDatos[0]);
      */
      res.send(`EL ID SELECIONADO NO EXISTE elije otro por favor `);
    }
  } //seleciono un auto
  else if (
    nuevosDatos[0].tabla === "autos" &&
    Object.keys(nuevosDatos[1]).length === 9
  ) {
    if (comprobarId(tabla, id) === true) {
      let indice = funcionDeApoyoPut_Indice(valoresDatosNuevos);
      let datosFinales = funcionDeApoyoPut_DatosNuevos(indice, nuevosDatos);
      //console.log("KEYS", keysDatosNuevos);
      modificoAuto(id, keysDatosNuevos, datosFinales);
      let tablaActual = seleccionarID(tabla, id);

      res.send(tablaActual);
    } else {
      res.send(`EL ID SELECIONADO NO EXISTE elije otro por favor `);
    }
  }

  //
  else {
    res.send(" no es una tabla valida ");
  }

  //digo lo que quiero cambiar
  //doy los datos nuevos
  //hago el cambio y debuelvo la tabla otra vez
});

const testFolder = "./public/Imagenes-Autos";
//ESTE DE ACA ES EL BUENO
//tenemos que hacer que ponga los nombres en un array *LISTO*
//ok , esta shit la vamos a hacer de esta manera, vamos a guardar las imagenes a pelo en el server
// el front es que la va a asignar a algun lugar y eso
// primero , vamos a cargar 1 imagen a ver que onda
let arrayDeNombresIMG = [];
let nombres = fs.readdirSync(testFolder).forEach((file) => {
  arrayDeNombresIMG.push(file);
  console.log(file);
});
//parte 2, hay que hacer 6 arrays de img, y mandarlos para el front, es lo mismo que antes
app.get("/TEST_IMAGENES", (req, res) => {
  //res.sendFile(__dirname + "/Imagenes-Autos/Chevrolet S 10.jpg");
  nombres;
  res.send(arrayDeNombresIMG);
});
app.get("/TEST_IMAGENESV2", (req, res) => {
  let arrayCarpetas = [
    "./public/Chicos",
    "./public/Medianos",
    "./public/Grandes",
    "./public/Camionetas",
    "./public/Vans",
    "./public/Premiun",
  ];

  const nombreDeJsons = [
    "Chicos",
    "Medianos",
    "Grandes",
    "Camionetas",
    "Vans",
    "Premiun",
  ];
  let direccionesCompletas = [];
  let jsonImg = {};
  for (let x = 0; x < arrayCarpetas.length; x++) {
    //loop.push({nombreDeJsons[x]: "value_a_" + x , value2: "value_b_" + x});

    direccionesCompletas.push(fs.readdirSync(arrayCarpetas[x]));
    console.log("FS CARPETAS", direccionesCompletas);
  }
  /*for (let x = 0; x < nombreDeJsons.length; x++) {
    jsonImg.push({
      key: nombreDeJsons[x],
      value: direccionesCompletas[x],
    });
  }*/
  //K de key, y V de value
  nombreDeJsons.forEach(function (k, v) {
    jsonImg[k] = direccionesCompletas[v];
  });

  //res.sendFile(__dirname + "/Imagenes-Autos/Chevrolet S 10.jpg");

  res.send(jsonImg);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/ftp",
  express.static("public/Imagenes-Autos"),
  serveIndex("public/Imagenes-Autos", { icons: true })
);
app.listen(PUERTO);
//console.log(`Escuchando en el puerto ${PUERTO}`);
