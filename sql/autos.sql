DROP TABLE IF EXISTS Autos
CREATE TABLE Autos(id DOUBLE,modelo VARCHAR(10),catidad_Total DOUBLE,cantidad_disponible DOUBLE);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (1,'auto n°1',5,3);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (2,'auto n°2',5,4);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (3,'auto n°3',5,1);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (4,'auto n°4',10,8);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (5,'auto n°5',10,4);

SELECT * FROM Autos

DROP TABLE IF EXISTS Autos
CREATE TABLE Autos(id DOUBLE,Marca VARCHAR(10),Modelo VARCHAR(10),Año INT,Kms INT,Color VARCHAR(10),Aire_acondicionado BOOLEAN,Pasajeros,trasmision BOOLEAN);
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision ) VALUES (1,'marca n°1','modelo n°1',2010,10000,'azul',TRUE,5,TRUE );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision ) VALUES (2,'marca n°2','modelo n°2',2000,100000,'azul',FALSE,5,FALSE );
SELECT * FROM Autos



