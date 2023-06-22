DROP TABLE IF EXISTS transacciones
CREATE TABLE transacciones(id DOUBLE NOT NULL,id_Cliente DOUBLE NOT NULL,id_Auto DOUBLE NOT NULL,fecha_de_alquiler DATETIME NOT NULL,fecha_de_devolucion DATETIME NOT NULL,devuelto VARCHAR(10) NOT NULL);
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (1,1,2,DATE('2023-04-01'),DATE('2023-04-01'),"si");
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (2,2,3,DATE('2023-04-01'),DATE('2023-04-01'),"si");
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (3,3,5,DATE('2023-04-01'),DATE('2023-04-01'),"si");
/*
ok, aca vamos a practicar unas transacciones "falsas", vamos a usar foreing keys, y ya
no vamos a hacer mas que eso, luego, de que controle mas o menos bien eso, vamos a hacer sus
funciones de control,y luego, vamos a hacer la direccion para la api
esta va a ser sencilla al principio , sin verificiaciones, y luego , completa con verificaciones
y se acabo
*/
/*
primero, vamos a crear una nueva tabla de tansaciones, acordate de que hay que apagar el pragma
los foreign_keys van a ser, el id del cliente, y el id del auto

*/
PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS transaccionesV2;
CREATE TABLE transaccionesV2(id DOUBLE NOT NULL,
id_Cliente INTEGER NOT NULL,
id_Auto INTEGER NOT NULL,
fecha_de_alquiler DATETIME NOT NULL,
fecha_de_devolucion DATETIME NOT NULL,
devuelto VARCHAR(10) NOT NULL,
FOREIGN KEY(id_Cliente) REFERENCES Cuentas(id)
FOREIGN KEY(id_Auto) REFERENCES Autos(id)
);
PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS transaccionesTESTV2;
CREATE TABLE transaccionesTESTV2(
    id_Cliente INTEGER NOT NULL,
    id_Auto INTEGER NOT NULL,
    fecha_Actual DATE DEFAULT (datetime('now','localtime')) NOT NULL,
    fecha_de_devolucion DATETIME NOT NULL,

    FOREIGN KEY(id_Cliente) REFERENCES Cuentas(id)
    FOREIGN KEY(id_Auto) REFERENCES Autos(id)

);
PRAGMA foreign_keys = ON;
INSERT INTO transaccionesTESTV2 (id_Cliente,id_Auto,fecha_de_devolucion) VALUES (1,2,'2023-06-20');
SELECT * FROM transaccionesTESTV2 
SELECT fecha_de_devolucion FROM transaccionesTESTV2 WHERE id_Auto=2

SELECT strftime('%m', fecha_de_devolucion) AS month,
 strftime('%d', fecha_de_devolucion) AS day,
 strftime('%Y', fecha_de_devolucion) AS year

FROM transaccionesTESTV2 WHERE id_Auto=2



SELECT * FROM Cuentas WHERE id=1



PRAGMA foreign_keys = ON;
INSERT INTO transaccionesV2 (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (1,1,1,DATE('2023-04-01'),DATE('2023-04-01'),"si");
SELECT * FROM Cuentas WHERE id=1
SELECT * FROM transaccionesV2 




SELECT * FROM transacciones
delete  FROM transacciones WHERE id_Cliente = 1


SELECT MONTH(fecha_de_alquiler)
FROM transacciones
WHERE fecha_de_alquiler = '2023-04-01';

SELECT EXTRACT(MONTH FROM fecha_de_alquiler)
FROM transacciones
WHERE fecha_de_alquiler = '2023-04-01';


SELECT strftime('%m', fecha_de_alquiler) AS month,
 strftime('%d', fecha_de_alquiler) AS day,
 strftime('%Y', fecha_de_alquiler) AS year


FROM transacciones WHERE id_Cliente=2
/*
ESTE DE ACA ABAJO ES EL BUENO
*/

SELECT strftime('%d', fecha_de_alquiler) AS "Day"
SELECT strftime('%m', fecha_de_alquiler) AS "Month"
SELECT strftime('%Y', fecha_de_alquiler) AS "Year"
FROM transacciones WHERE id_Cliente=2

