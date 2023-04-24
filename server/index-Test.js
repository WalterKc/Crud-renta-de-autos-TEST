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
  crear,
  elimino,
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
  console.log(" SQL", todo);
  console.log(" SQL TABLA ", selecciono_1_tabla);
  console.log(" SQL ID ", selecciono_un_ID_en_particular);
  //elimino_un_objeto_particular;
  //elimino();
  console.log(" SQL actualizado", todo);

  res.json(todo);
});
app.post("/", (req, res) => {
  crear();
  console.log(" SQL actualizado", todo);
  res.json(todo);
});
app.delete("/", (req, res) => {
  elimino();
  console.log(" SQL actualizado", todo);
  res.json(todo);
});

app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);
