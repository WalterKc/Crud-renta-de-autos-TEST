//import Database from "better-sqlite3";
//const sqlite = require("better-sqlite3");
//el database es fijo
//esto esta casi listo para ponerlo en el contenedor, solo hay que hacerlo mas modular
const Database = require("better-sqlite3");
const { object } = require("rsdi");

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
      `INSERT INTO "Cuentas" (id,username,role,telefono,email) VALUES  (${datos[0]},'${datos[1]}','${datos[2]}',${datos[3]},'${datos[4]}')`
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
//tarde, literalmente 10 segundos en actualizar/modificar esto, no me rompas las pelotas con esto, por que te voy
//a mandar a la mierda, tarde mas en escribir esto que en modificarlo
function crearAuto(datos) {
  console.log(" DATOS", datos);
  const crear = db
    .prepare(
      `INSERT INTO "autos" (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision) VALUES  (${datos[0]},'${datos[1]}','${datos[2]}',${datos[3]},${datos[4]},'${datos[5]}',${datos[6]},${datos[7]},'${datos[8]}')`
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
      `UPDATE cuentas SET '${columnasACAmbiar[0]}' = '${datosNuevos[0]}','${columnasACAmbiar[1]}' = '${datosNuevos[1]}','${columnasACAmbiar[2]}' = '${datosNuevos[2]}','${columnasACAmbiar[3]}' = '${datosNuevos[3]}','${columnasACAmbiar[4]}' = '${datosNuevos[4]}' WHERE id =${id}`
    )
    .run();
  return update;
  console.log(" NUEVO DATO ID", id);

  console.log(" NUEVO DATO INTERNO 0", datosNuevos);
  //cambio
}
//modificoauto
///esto es una herramienta, no se configura
//ok, lo que tengo que hace es simple, pero es lo ultimo que tengo que hacer
//el front siempre va a mandar todo el json, pero si alguna columna no tiene cambios, se envia null y ya
//y lo que tiene que hacer el server es, nonde apareec ese null, llenarlo con los datos viejos y ya
//por lo que, los datos nuevos, lo va a entregar una funcion, si es una kaka, pero no tengo ganas
//de ver como arreglo lo del update, y esto hace ,mas o menos , lo mismo

function funcionDeApoyoPut_Indice(arrayDatos) {
  var indices = [];
  //var arrayDatos = Object.values(nuevosDatos[1]);
  var element = null;
  var idx = arrayDatos.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = arrayDatos.indexOf(element, idx + 1);
  }
  console.log(indices);
  return indices;
}
//esta funcion va a entregar el array final
function funcionDeApoyoPut_DatosNuevos(indice, datosAUnir) {
  let datosFinales = [];
  let tablaActual = seleccionarID(datosAUnir[0].tabla, datosAUnir[1].id);
  let valoresTablaActual = Object.values(tablaActual[0]);
  let valoresDatosAUnir = Object.values(datosAUnir[1]);

  for (let x = 0; x < valoresDatosAUnir.length; x++) {
    if (indice.indexOf(x) != -1) {
      datosFinales.push(valoresTablaActual[x]);
    } else {
      datosFinales.push(valoresDatosAUnir[x]);
    }
  }

  console.log("TAMAÑO DATOS A U", valoresDatosAUnir.length);
  console.log("DATOS 'MALOS'", valoresDatosAUnir);

  console.log("DATOS FINALES BUENOS", datosFinales);
  console.log("TABLA ACTUAL INTERNA", valoresTablaActual);

  return datosFinales;

  //
}

function modificoAuto(id, columnasACAmbiar, datosNuevos) {
  //seleciono el auto
  //seleciono lo que quiero cambiar
  //ACOTADE DE SELECIONAR BIEN LA TABLA PLS
  //console.log("COLUMNAS ", columnasACAmbiar);
  //console.log("DATOS ", datosNuevos);

  let update = db
    .prepare(
      `UPDATE Autos SET '${columnasACAmbiar[0]}' = '${datosNuevos[0]}','${columnasACAmbiar[1]}' = '${datosNuevos[1]}','${columnasACAmbiar[2]}' = '${datosNuevos[2]}','${columnasACAmbiar[3]}' = '${datosNuevos[3]}','${columnasACAmbiar[4]}' = '${datosNuevos[4]}','${columnasACAmbiar[5]}' = '${datosNuevos[5]}','${columnasACAmbiar[6]}' = '${datosNuevos[6]}','${columnasACAmbiar[7]}' = '${datosNuevos[7]}','${columnasACAmbiar[8]}' = '${datosNuevos[8]}' WHERE id =${id}`
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

function eliminarFilaDeTabla(id, tabla) {
  const eliminar = db.prepare(`DELETE FROM '${tabla}' WHERE id = ${id}`).run();
  console.log(" CAMBIOS", eliminar.changes);

  console.log(" SQL INTERNO DES", todo.all());
  return eliminar;
}
/*vale la pena hacer esto?mmmmmmm */
function updateTEST(id, columnasACAmbiar, datosNuevos) {
  let update = db
    .prepare(
      `UPDATE cuentas SET "${columnasACAmbiar.forEach((element) => {
        element = datosNuevos;
      })}" WHERE id =${id}`
    )
    .run();
  return update;
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
  db,
  crearAuto,
  modificoAuto,
  eliminoAuto,
  eliminarFilaDeTabla,
  updateTEST,
  funcionDeApoyoPut_Indice,
  funcionDeApoyoPut_DatosNuevos,
};
