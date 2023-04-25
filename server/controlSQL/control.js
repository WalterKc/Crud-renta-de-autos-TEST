//import Database from "better-sqlite3";
//const sqlite = require("better-sqlite3");
const Database = require("better-sqlite3");

const db = new Database("../base_test.db", {
  verbose: console.log,
});
//const db = new Database("../base_test.db", { verbose: console.log });
//db.pragma("journal_mode = WAL");

const todo = db.prepare("SELECT * FROM Cuentas");
const selecciono_1_tabla = db.prepare("SELECT id FROM Cuentas");
const selecciono_un_ID_en_particular = db.prepare(
  "SELECT * FROM Cuentas WHERE id = 1"
);

//console.log(todo);
//module.exports = todo.all();
/**
 * FUNCIONA!, ok, la shit funcionaba bien, pero estaba mal el control, mira bien abajo
 * si queres saber que cosa pasa en cualquier lado de tu sql, si o si, tiene que ordenarse aca
 * por que ni no se hace aca, no se muestran los datos actualizados, como en el ejemplo de abajo
 * si intento llamar a los datos de la base de datos desde el selector, no funciona, pero si lo hago
 * de aca, si
 */
function crear() {
  const crear = db
    .prepare(
      "INSERT INTO `Cuentas` (id,username,role) VALUES (4,'pichi','guest')"
    )
    .run();
  console.log(" CAMBIOS", crear.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return crear;
}
function elimino() {
  const eliminar = db.prepare("DELETE FROM Cuentas WHERE id = 4").run();
  console.log(" CAMBIOS", eliminar.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return crear;
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
