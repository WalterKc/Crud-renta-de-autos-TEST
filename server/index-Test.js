//aca van las direcciones
const {
  todo,
  selecciono_1_tabla,
  selecciono_un_ID_en_particular,
  //inserto_un_nuevo_objeto,
  //elimino_un_objeto_particular,
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
  funcionDeApoyoPut_Indice,
  funcionDeApoyoPut_DatosNuevos,
  comprobarEMAIL,
  seleccionarEMAIL,
  comprobarContraseña,
  seleccionarContraseña,
  seleccionarContraseñaV2,
  comprobarContraseñaV2,
  crearUsuarioV2,
  seleccionarAutoXTipo,
  transaccionesV1,
} = require("./controlSQL/control.js");

//esto no se toca por ahora
const express = require("express");
var cors = require("cors");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const PUERTO = 8080;
const app = express();
app.use(cors());
app.use(express.json());
////
////

//test de seciones//

const SqliteStore = require("better-sqlite3-session-store")(session);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  session({
    store: new SqliteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 60000, //ms = 60seg
      },
    }),
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

/**
 * TEST INDEX
 */
var serveIndex = require("serve-index");
const { stringify } = require("querystring");
const { object } = require("rsdi");
/**
 * TEST 2 INDEX
 */

//este no se borra
app.post("/sessionesV2", (req, res) => {
  let selector = req.body;

  req.session.email = selector.email;
  req.session.usuario = selector.usuario;
  req.session.rol = selector.rol;
  req.session.cookie.maxAge = 60000;
  req.session.autenticado = true;
  console.log(
    "DATOS/ID DEL EMAIL SELECIONADO",
    seleccionarEMAIL("Cuentas", selector.email)
  );

  secionesID = {
    id: req.session.id,
    nombre: req.session.usuario,
    rol: req.session.rol,
    email: req.session.email,
  };

  //req.session.cookie.username = "req.body.usuario";
  /*res.send(
    `el usuario${req.session.usuario}, con el rol ${req.session.rol}, visito la pagina `
  );*/
  //res.cookie("name", req.session.id, req.session.cookie.expires);
  res.send({
    mensaje: `el usuario${req.session.usuario} con el rol ${req.session.rol}, visito la pagina `,
    usuario: req.session.usuario,
    rol: req.session.rol,
    id: req.session.id,
    email: req.session.email,
    cookie: req.session.cookie,
    tiempo: req.session.cookie.maxAge,
    tiempoEstandar: 1 / 1440, //1 dia =1440 min, 1 min =1d/1440min
    datosParaLaCookie: secionesID,
  });
});

//esta es la que tiene el error
app.get("/cookie", (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  console.log("TEST DE NOMBRE", secionesID);
  //aca vamos a hacer el test  general de la cookie
  // seteamos la cookie a 2 minutos
  //le pasamos la id de la session
  //le pasamos el nombre de usuario
  //verificamos

  const value = "my cookie value";
  const path = "/";

  const cookieOptions = {
    maxAge: 60000,
    secure: true, // set the cookie to be secure
    sameSite: "lax", // set the cookie to be accessible to all sites and allow all cross-origin requests that are lax with cookie blocking
  };

  const cookie = req.headers.cookie;

  res.cookie("Otracookie", secionesID, cookieOptions);
  console.log("ESTA ES LA COOKIE", cookie);
  console.log("ESTA ES LA secionesID", secionesID);
  console.log("ESTA ES LA IP", req.ip);
  //console.log("ESTA ES LA origin", req.headers);

  res.send({ mensaje: "hola, soy una cookie bebe" });
});

//aca se va a practicar el sincronismo, es facil lo que tenemos que hace, vamos a hacer un get, y con este get
//vamos a revisar si exite la cookie enviada desde el front, si existe, se envia el mensaje exite
//caso contrario, se envia que no se acabo
/**
 * funcion de ayuda
 */
//esta de aca, es probable que valla en el control sql
function seleccionarSID(tabla, ID) {
  const IdSelecionado = db
    .prepare(`SELECT * FROM ${tabla} WHERE sid = '${ID}'`)
    .all();
  return IdSelecionado;
}
//no se que poner aca
app.post("/seccionesTestCookie", (req, res) => {
  //res.header("Access-Control-Allow-Credentials", true);
  //res.header("Access-Control-Allow-Origin", req.headers.origin);
  //res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

  //const cookieDelFront = req.headers.cookie;
  const cookieDelFront = req.body.cookie;
  console.log("cookieDelFront", cookieDelFront);
  console.log("QUE LLEGA?", req.headers);
  console.log("ME CAGO EN TODO Y HAGO LO QUE QUIERO", req.body.cookie);

  //trabajamos la cookie para que nos de un resultado aceptable
  //llamamos al selecotor de id(por suerte es de proposito general)
  //la funcion asi nomas no funciona, vamos a hacerle una modificaion
  /**
   * como esto tiene que funciona?
   * asi, primero, revisamos si la pagina tiene una cookie, si no la tiene, se envia false
   * si la tiene, se revisa si esta esta dentro de las secciones,
   * si esta no esta dentro de las secciones, se manda un false
   * si esta esta dentro de la seccion, se envia un true
   * estas señales de false o true, se van a usar para borrar la cookie en caso de que este expirada
   *
   * agrego los false/true
   */
  const funcionApoyoValidacionJson = (obj) => {
    try {
      const parsed = JSON.parse(obj[1]); // This will throw an error if input is not a valid JSON string
      return true;
    } catch (e) {
      return false;
    }
  };

  if (cookieDelFront !== "") {
    const cookieBruta = decodeURIComponent(cookieDelFront);
    const cookiePares = cookieBruta.split("j:");
    if (funcionApoyoValidacionJson(cookiePares)) {
      const valoresCookie = JSON.parse(cookiePares[1]);
      const idSeccion = seleccionarSID("sessions", valoresCookie.id);

      if (idSeccion) {
        console.log("ACA SE MUESTRA LA TABLA DE LA BASE DE DATOS", idSeccion);

        res.send({
          mensaje: "LA SECCION EXISTE",
          datos: idSeccion,
          estadoVerificacion: true,
        });
      } else {
        res.send({
          mensaje: "LA SECCION NOOO EXISTE",
          estadoVerificacion: false,
        });
      }
    } else {
      console.log("no es una cookie valida");
      res.send({
        mensaje: "no es una cookie valida",
        estadoVerificacion: false,
      });
    }
  } else {
    res.send({ mensaje: "NO HAY COOKIE", estadoVerificacion: false });
  }
  //console.log("COOKIE PURA ESTADO 0", cookieDelFront);
  //res.send({ mensaje: cookieDelFront });
});

//para hacer la eliminacion de la seccion es facil, hay que modificar la funcin delete que ya tenemos
//y, ASUMIENDO QUE, alguien envio la señal de eliminar algo, se elimina con respecto a la id y ya
/**
 * funcion de apoyo (estas van en el control del sql)
 */
//esta de aca, es probable que valla en el control sql

function eliminoSID(id) {
  const eliminar = db.prepare(`DELETE FROM sessions WHERE sid = '${id}'`).run();

  return eliminar;
}
//OK
app.post("/eliminoSeccion", (req, res) => {
  /** guia de que hay que hacer aqui
   * capturamos la cookie
   * le sacamos la id
   * borramos esa id, y mandamos la señal de listo
   * se acabo
   *
   */
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

  //const cookieDelFront = req.headers.cookie;
  const cookieDelFront = req.body.cookie;
  const cookieBruta = decodeURIComponent(cookieDelFront);
  const cookiePares = cookieBruta.split("j:");
  const valoresCookie = JSON.parse(cookiePares[1]);
  eliminoSID(valoresCookie.id);
  //const idSeccion = eliminoSID(valoresCookie.id);
  console.log("Seccion ELIMINADA");
  res.send({ mensaje: " Seccion ELIMINADA", estadoEliminacion: true });
});

//igual, no se que nombre ponerle
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
//igual, no se que nombre ponerle

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
    crearUsuarioV2(Object.values(nuevosDatos[1]));
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

//ESTO ES PARA LOS AUTOS SE DEJA
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

      crearUsuarioV2(Object.values(nuevosDatos[1]));
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

//PARA LOS AUTOS
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
//PARA LOS AUTOS/usuarios
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
app.get("/Autos", (req, res) => {
  const autosChicos = seleccionarAutoXTipo("chico");
  const autosMedianos = seleccionarAutoXTipo("mediano");
  const autosGrandes = seleccionarAutoXTipo("grande");
  const camioneta = seleccionarAutoXTipo("camioneta");
  const vans = seleccionarAutoXTipo("van");
  const premiun = seleccionarAutoXTipo("premiun");
  console.log("VANS ", vans);
  res.send({
    Chicos: autosChicos,
    Medianos: autosMedianos,
    Grandes: autosGrandes,
    Camionetas: camioneta,
    Vans: vans,
    Premiun: premiun,
  });
  //
});
app.post("/TransaccionesTest", (req, res) => {
  let selector = req.body;
  //let id = selector.id;//el id, hay que sacarlo por medio del email

  //ok, aca tenemos varias opciones la verdad, podemos copiar lo de la verificiacion de session(que
  //para eso la hicimos), o podemos hacerlo por medio de el front, de cualquier manera, esto va a recibir un estado de verificacion
  //asi que, vamos a tener que elejir una, pero por ahora, vamos a dejarlo simple con una verificacion mokeada
  /*
  console.log(
    "DATOS/ID DEL EMAIL SELECIONADO TRANSACIONESTEST",
    seleccionarEMAIL("Cuentas", selector.email)
  );
  let datosCuenta = seleccionarEMAIL("Cuentas", selector.email);
  console.log("datosCuenta ID SELECIONADO TRANSACIONESTEST", datosCuenta[0].id);
  transaccionesV1(datosCuenta[0].id);
  */
  /**
   * idea de como hacer esto, es algo bastante completo y mas seguro que lo otro que habiamos pensado
   * y sencillo, pero, puede consumir algo mas de recursos, pero , como las transaciones son muy
   * importantes y no se hacen tantas, creo que vale la pena
   * primero, verificamos si hay cookie, si no hay, se termina y listo
   * segundo , si hay cookie, extraemos su id y email, luego extraemos el email de la seccion, y si estos son iguales pasa
   * pero si no son iguales, o la seccion no existe, se para
   * si pasa esta comprobacion, entonces, esta habilidato para hacer la transaccion(esto sin incluir el pago, que esta mokeado)
   * esto va despues de que tenemos selecionado el auto y eso en si,
   * asi que vamos a hacer lo siguiente, vamos a selecionar una id de un auto, una de un user, el email y vamos a enviarlo
   * la id de los autos debe de estar en un array, por si son mas de 1
   *
   *
   */
  const cookieDelFront = req.body.cookie;
  //primero, verificamos si hay cookie, si no hay, se termina y listo
  if (cookieDelFront !== "") {
    //segundo , si hay cookie, extraemos su id y email, luego extraemos el email de la seccion, y si estos son iguales pasa
    //pero si no son iguales, o la seccion no existe, se para
    const cookieBruta = decodeURIComponent(cookieDelFront);
    const cookiePares = cookieBruta.split("j:");
    const valoresCookie = JSON.parse(cookiePares[1]);
    const emailCookie = valoresCookie.email;
    const idSeccion = seleccionarSID("sessions", valoresCookie.id);
    const datosSeccionOrdenados = JSON.parse(idSeccion[0].sess);
    const emailDeLASeccion = datosSeccionOrdenados.email;

    let verificacion = selector.verificacion;
    console.log("valores COOKIES BRUTA", cookieDelFront);
    console.log("valores COOKIES", valoresCookie);
    console.log("valores SECCION", idSeccion[0].sess);
    console.log("Datos SECCION", datosSeccionOrdenados);
    console.log("Email COOKIE", emailCookie);
    console.log("Email SECCION", emailDeLASeccion);
    if (emailCookie === emailDeLASeccion) {
      res.send(selector);
      console.log("DATOS DEL FRONT AUTOS", selector.autos);
      console.log(
        "Email SECCION ID",
        seleccionarEMAIL("Cuentas", emailDeLASeccion)[0].id
      );
      const idSeccion = seleccionarEMAIL("Cuentas", emailDeLASeccion)[0].id;

      transaccionesV1(idSeccion, selector.autos, selector.fechaDeDevolucion);

      //pasa, aca vamos a llamar al body, tenemos que traer al menos 2 ids, el del user y un array de id de autos
      //la id   del user, se saca del servidor(aca), y la de los autos , viene del front, esta no tiene tiempo limite ni nada
    } else {
      console.log("NO PASA, SE TERMINO");
    }
  } else {
    console.log("NO HAY COOKIE, SE TERMINO");
    res.send(selector);
  }
});
//Control de imagenes por servidor

const testFolder = "./public/Imagenes-Autos";
//ESTE DE ACA ES EL BUENO
//tenemos que hacer que ponga los nombres en un array *LISTO*
//ok , esta shit la vamos a hacer de esta manera, vamos a guardar las imagenes a pelo en el server
// el front es que la va a asignar a algun lugar y eso
// primero , vamos a cargar 1 imagen a ver que onda
let arrayDeNombresIMG = [];
let nombres = fs.readdirSync(testFolder).forEach((file) => {
  arrayDeNombresIMG.push(file);
  //console.log(file);
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
