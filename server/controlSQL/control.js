//import Database from "better-sqlite3";
//const sqlite = require("better-sqlite3");
//el database es fijo
//esto esta casi listo para ponerlo en el contenedor, solo hay que hacerlo mas modular
const Database = require("better-sqlite3");

//este de aca, se va a cambiar, al contenedor
//este esta bien asi como esta, no necestia nada mas
/////esto se puede configurar
function selectorDB(baseDeDatos) {
  const db = new Database(baseDeDatos, {
    verbose: console.log,
  });
  return db;
}
//Modular
let db = selectorDB("../base_test.db");
/*
const db = new Database("../base_test.db", {
  verbose: console.log,
});
*/

//const db = new Database("../base_test.db", { verbose: console.log });
//db.pragma("journal_mode = WAL");

//este es fijo, por que siempre da todo
const todo = db.prepare("SELECT * FROM Cuentas");
//esta esta perfecta, no es necesario cambios
///esto es una herramienta, no se configura
function muestro_tabla(tabla) {
  const datos = db.prepare(`SELECT * FROM ${tabla}`).all();
  return datos;
}
//estos de aca, vamos a cambiarlos y van para el contenedor tambien
const selecciono_1_tabla = db.prepare("SELECT id FROM Cuentas");
const selecciono_un_ID_en_particular = db.prepare(
  "SELECT * FROM Cuentas WHERE id = 1"
);
///esto es una herramienta, no se configura

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
//esta funcion de control, tiene que ser externa, no interna, asi que, no hay que menterla adentro de nadie
//se la llama por fuera y ya, es mas sencillo
///esto es una herramienta, no se configura

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
///esto es una herramienta, no se configura

function crearUsusario(datos) {
  console.log(" DATOS", datos);
  const crear = db
    .prepare(
      `INSERT INTO "Cuentas" (id,username,role) VALUES  (${datos[0]},'${datos[1]}','${datos[2]}')`
    )
    .run();
  console.log(" CAMBIOS", crear.changes);

  console.log(" SQL INTERNO DES", muestro_tabla("cuentas"));
  return crear;
}
///esto es una herramienta, no se configura

function eliminoCliente(id) {
  const eliminar = db.prepare(`DELETE FROM Cuentas WHERE id = ${id}`).run();
  console.log(" CAMBIOS", eliminar.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return eliminar;
}
//crearAuto
///esto es una herramienta, no se configura

function crearAuto(datos) {
  console.log(" DATOS", datos);
  const crear = db
    .prepare(
      `INSERT INTO "autos" (id,modelo,catidad_Total,cantidad_disponible) VALUES  (${datos[0]},'${datos[1]}','${datos[2]}','${datos[3]}')`
    )
    .run();
  console.log(" CAMBIOS", crear.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return crear;
}

//modificocliente
///esto es una herramienta, no se configura

function modificoCliente(id, columnasACAmbiar, datosNuevos) {
  //seleciono un user
  //let usuario = seleccionarID("cuentas", id);
  //seleciono lo que quiero cambiar
  let update = db
    .prepare(
      `UPDATE cuentas SET '${columnasACAmbiar[0]}' = '${datosNuevos[0]}','${columnasACAmbiar[1]}' = '${datosNuevos[1]}','${columnasACAmbiar[2]}' = '${datosNuevos[2]}','${columnasACAmbiar[3]}' = '${datosNuevos[3]}' WHERE id =${id}`
    )
    .run();
  return update;
  console.log(" NUEVO DATO ID", id);

  console.log(" NUEVO DATO INTERNO 0", datosNuevos);
  //cambio
}
//modificoauto
///esto es una herramienta, no se configura

function modificoAuto(id, columnasACAmbiar, datosNuevos) {
  //seleciono el auto
  //seleciono lo que quiero cambiar
  //cambio
  let update = db
    .prepare(
      `UPDATE cuentas SET '${columnasACAmbiar[0]}' = '${datosNuevos[0]}','${columnasACAmbiar[1]}' = '${datosNuevos[1]}','${columnasACAmbiar[2]}' = '${datosNuevos[2]}' WHERE id =${id}`
    )
    .run();
  return update;
}
//elminioauto
///esto es una herramienta, no se configura

function eliminoAuto(id) {
  const eliminar = db.prepare(`DELETE FROM autos WHERE id = ${id}`).run();
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
  modificoCliente,
};
