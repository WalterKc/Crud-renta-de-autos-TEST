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
} = require("./controlSQL/control.js");
//import { todo } from "./controlSQL/control.js";

const express = require("express");

const PUERTO = 8080;
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
  //console.log(cuentas);
  console.log(" SQL", muestro_tabla());
  console.log(" SQL TABLA ", selecciono_1_tabla);
  console.log(" SQL ID 1 ", seleccionarID("cuentas", 1));
  //elimino_un_objeto_particular;
  //elimino();
  console.log(" SQL actualizado", muestro_tabla());

  res.json(muestro_tabla());
  comprobarId("cuentas", 4);
  res.end;
});
app.post("/", (req, res) => {
  crearUsusario([5, "martin", "gonzales"]);
  console.log(" XXXXXXXXXXXXXX");
  res.json(muestro_tabla());
});
app.delete("/", (req, res) => {
  eliminoCliente(5);
  console.log(" YYYYYYYYYYYYYYYY");
  res.json(muestro_tabla());
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
  crearUsusario(Object.values(datos));

  console.log("compruebo", comprobarId("cuentas", datos.x));
  if (comprobarId("cuentas", datos.x)) {
    res.send(`EL ID SELECIONADO NO ESTA DISPONIBLE elije otro por favor `);
  } else {
    res.json(muestro_tabla());
  }
});

app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);
