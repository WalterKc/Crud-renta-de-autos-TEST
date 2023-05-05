DROP TABLE IF EXISTS transacciones
CREATE TABLE transacciones(id DOUBLE,id_Cliente DOUBLE,id_Auto DOUBLE,fecha_de_alquiler DATETIME,fecha_de_devolucion DATETIME,devuelto VARCHAR(10));
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (1,1,2,DATE('2023-04-01'),DATE('2023-04-01'),"si");
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (2,2,3,DATE('2023-04-01'),DATE('2023-04-01'),"si");
INSERT INTO transacciones (id,id_Cliente,id_Auto,fecha_de_alquiler,fecha_de_devolucion,devuelto) VALUES (3,3,5,DATE('2023-04-01'),DATE('2023-04-01'),"si");

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

