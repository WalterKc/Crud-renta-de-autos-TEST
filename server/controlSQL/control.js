//import Database from "better-sqlite3";
//const sqlite = require("better-sqlite3");
//el database es fijo
const Database = require("better-sqlite3");

//este de aca, se va a cambiar, al contenedor
function selectorDB(baseDeDatos) {
  const db = new Database(baseDeDatos, {
    verbose: console.log,
  });
  return db;
}
const db = new Database("../base_test.db", {
  verbose: console.log,
});

//const db = new Database("../base_test.db", { verbose: console.log });
//db.pragma("journal_mode = WAL");

//este es fijo, por que siempre da todo
const todo = db.prepare("SELECT * FROM Cuentas");
function muestro_tabla() {
  const datos = selectorDB("../base_test.db")
    .prepare("SELECT * FROM Cuentas")
    .all();
  return datos;
}
//estos de aca, vamos a cambiarlos y van para el contenedor tambien
const selecciono_1_tabla = db.prepare("SELECT id FROM Cuentas");
const selecciono_un_ID_en_particular = db.prepare(
  "SELECT * FROM Cuentas WHERE id = 1"
);
function seleccionarID(tabla, ID) {
  const IdSelecionado = db
    .prepare(`SELECT * FROM ${tabla} WHERE id = ${ID}`)
    .all();
  return IdSelecionado;
}

//console.log(todo);
//module.exports = todo.all();
/**
 * FUNCIONA!, ok, la shit funcionaba bien, pero estaba mal el control, mira bien abajo
 * si queres saber que cosa pasa en cualquier lado de tu sql, si o si, tiene que ordenarse aca
 * por que ni no se hace aca, no se muestran los datos actualizados, como en el ejemplo de abajo
 * si intento llamar a los datos de la base de datos desde el selector, no funciona, pero si lo hago
 * de aca, si
 */
//estos 2 tambien, para el contenedor
//hay que tener en cuenta , que no vamos a crear todo, solo vamos a llenar datos , asi que
//no es necesario interpolar todo
function comprobarId(tabla, id) {
  let existe = false;
  if (seleccionarID(tabla, id)[0] !== undefined) {
    console.log(
      `EL ID SELECIONADO NO ESTA DISPONIBLE Y ES EL ID ${id}, elije otro por favor `
    );
    console.log("ID A TESTEAR", seleccionarID(tabla, id)[0]);
    existe = true;
    return existe;
  } else {
    console.log(` EL ID SELECIONADO ESTA DISPONIBLE Y ES EL ID ${id} `);
    return existe;
  }
}
function crearUsusario(datos) {
  if (comprobarId("cuentas", datos[0]) === true) {
    return;
  } else {
    console.log(" DATOS", datos);
    const crear = db
      .prepare(
        `INSERT INTO "Cuentas" (id,username,role) VALUES  (${datos[0]},'${datos[1]}','${datos[2]}')`
      )
      .run();
    console.log(" CAMBIOS", crear.changes);

    console.log(" SQL INTERNO DES", todo.all());
    return crear;
  }
}
function eliminoCliente(id) {
  const eliminar = db.prepare(`DELETE FROM Cuentas WHERE id = ${id}`).run();
  console.log(" CAMBIOS", eliminar.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return eliminar;
}
module.exports = {
  todo: todo.all(),
  selecciono_1_tabla: selecciono_1_tabla.all(),
  selecciono_un_ID_en_particular: selecciono_un_ID_en_particular.all(),
  //inserto_un_nuevo_objeto: inserto_un_nuevo_objeto.run(),
  crearUsusario,
  //elimino_un_objeto_particular: elimino_un_objeto_particular.run(),
  eliminoCliente,
  muestro_tabla,
  seleccionarID,
  comprobarId,
};
