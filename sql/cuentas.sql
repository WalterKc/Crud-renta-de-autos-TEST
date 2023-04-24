CREATE TABLE Cuentas(id DOUBLE,username VARCHAR(10),role VARCHAR(10));
INSERT INTO Cuentas (id,username,role) VALUES (1,'paulhal','admin');
INSERT INTO Cuentas (id,username,role) VALUES (2,'johndoe','guest');
INSERT INTO Cuentas (id,username,role) VALUES (3,'sarahjane','guest');

SELECT * FROM Cuentas

DELETE FROM Cuentas WHERE id = 4
