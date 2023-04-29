DROP TABLE IF EXISTS Autos
CREATE TABLE Autos(id DOUBLE,modelo VARCHAR(10),catidad_Total DOUBLE,cantidad_disponible DOUBLE);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (1,'auto n°1',5,3);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (2,'auto n°2',5,4);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (3,'auto n°3',5,1);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (4,'auto n°4',10,8);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (5,'auto n°5',10,4);

SELECT * FROM Autos
