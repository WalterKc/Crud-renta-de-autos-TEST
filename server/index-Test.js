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
} = require("./controlSQL/control.js");
//import { todo } from "./controlSQL/control.js";

const express = require("express");
var cors = require("cors");
const session = require("express-session");

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
//aca hay que hacer un selector, y con ese selector, pasar los datos necesarios para LAS 3 TABLAS
//este es el LA FUNCION PRINCIPAL, TIENE QUE ESTAR MUY BIEN ECHA, sino esta perfecta, no se va a avanzar
//luego hay que hacer lo mismo con las demas, pero va a ser un copy paste casi, luego de completar estas funciones
//vamos a hacer puro frot para tener una pagina completa(aunque fea al principio), en la guia a a decir como
//va a estar estrucutrada
app.put("/TEST_crear_datos", (req, res) => {
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

app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);
