DROP TABLE IF EXISTS cuentas
CREATE TABLE Cuentas(id INTEGER PRIMARY KEY AUTOINCREMENT NOT null,username VARCHAR(10) NOT NULL,role VARCHAR(10) NOT NULL,telefono NOT NULL,email NOT NULL,contraseña NOT NULL);
INSERT INTO Cuentas (id,username,role,telefono,email,contraseña) VALUES (1,'paulhal','admin',123456,"email@ejemplo1.com","contraseña1");
INSERT INTO Cuentas (id,username,role,telefono,email,contraseña) VALUES (2,'johndoe','guest',123456,"email@ejemplo2.com","contraseña2");
INSERT INTO Cuentas (id,username,role,telefono,email,contraseña) VALUES (3,'sarahjane','guest',123456,"email@ejemplo3.com","contraseña3");

SELECT * FROM Cuentas
INSERT INTO Cuentas (username,role,telefono,email,contraseña) VALUES ('sarahjane','guest',123456,"email@ejemplo3.com","contraseña3");

DROP TABLE IF EXISTS sessions
SELECT * FROM sessions

SELECT * FROM Cuentas WHERE email= "email@ejemplo1.com" AND contraseña ="contraseña1";







delete  FROM Cuentas WHERE id = 6
