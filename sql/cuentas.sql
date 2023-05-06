DROP TABLE IF EXISTS cuentas
CREATE TABLE Cuentas(id DOUBLE NOT NULL,username VARCHAR(10) NOT NULL,role VARCHAR(10) NOT NULL,telefono NOT NULL,email NOT NULL);
INSERT INTO Cuentas (id,username,role,telefono,email) VALUES (1,'paulhal','admin',123456,"email@ejemplo1.com");
INSERT INTO Cuentas (id,username,role,telefono,email) VALUES (2,'johndoe','guest',123456,"email@ejemplo2.com");
INSERT INTO Cuentas (id,username,role,telefono,email) VALUES (3,'sarahjane','guest',123456,"email@ejemplo3.com");

SELECT * FROM Cuentas
SELECT * FROM sessions




delete  FROM Cuentas WHERE id = 6
