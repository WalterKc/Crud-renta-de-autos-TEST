//import Database from "better-sqlite3";
//const sqlite = require("better-sqlite3");

const db = require("better-sqlite3")("../base_test.db", {
  verbose: console.log,
});
//const db = new Database("../base_test.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

const todo = db.prepare("SELECT * FROM Cuentas");
const selecciono_1_tabla = db.prepare("SELECT id FROM Cuentas");
const selecciono_un_ID_en_particular = db.prepare(
  "SELECT * FROM Cuentas WHERE id = 1"
);

//console.log(todo);
//module.exports = todo.all();
function crear() {
  db.exec(
    "INSERT INTO `Cuentas` (id,username,role) VALUES (4,'pichi','guest')"
  );
}
function elimino() {
  db.exec("DELETE FROM Cuentas WHERE id = 4");
}

module.exports = {
  todo: todo.all(),
  selecciono_1_tabla: selecciono_1_tabla.all(),
  selecciono_un_ID_en_particular: selecciono_un_ID_en_particular.all(),
  //inserto_un_nuevo_objeto: inserto_un_nuevo_objeto.run(),
  crear,
  //elimino_un_objeto_particular: elimino_un_objeto_particular.run(),
  elimino,
};
