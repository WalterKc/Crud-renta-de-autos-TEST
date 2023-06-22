DROP TABLE IF EXISTS Autos
CREATE TABLE Autos(id DOUBLE,modelo VARCHAR(10),catidad_Total DOUBLE,cantidad_disponible DOUBLE);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (1,'auto n°1',5,3);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (2,'auto n°2',5,4);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (3,'auto n°3',5,1);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (4,'auto n°4',10,8);
INSERT INTO Autos (id,modelo,catidad_Total,cantidad_disponible) VALUES (5,'auto n°5',10,4);

SELECT * FROM Autos
                
DROP TABLE IF EXISTS Autos
CREATE TABLE Autos(id INTEGER PRIMARY KEY NOT null,Marca VARCHAR(10) NOT NULL,Modelo VARCHAR(10) NOT NULL,Año INT NOT NULL,Kms INT NOT NULL,Color VARCHAR(10) NOT NULL,Aire_acondicionado BOOLEAN NOT NULL,Pasajeros NOT NULL,trasmision NOT NULL,Tipo);
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (1,'Chevrolet ','celta',2013,20000,'gris',TRUE,5,"manual" ,"chico");
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (2,'Chevrolet','Onix',2017,20000,'blanco',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (3,'Ford','Ka 1.6',2012,20000,'negro',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (4,'Nissan','March Active',2017,20000,'gris',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (5,'Nissan','Versa',2023,20000,'rojo',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (6,'Renault','Clio',2013,20000,'gris',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (7,'Toyota','Etios',2013,20000,'gris',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (8,'Volkswagen','Gol Vw',2011,20000,'rojo',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (9,'Volkswagen','Gol ',2015,20000,'gris',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (10,'Volkswagen','UP ',2016,20000,'gris',TRUE,5,"manual","chico" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (11,'Chevrolet','Classic ',2016,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (12,'Chevrolet','Classic ',2016,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (13,'Chevrolet','Pristma joy ',2018,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (14,'Chevrolet','Pristma ',2018,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (15,'Fiat','Cronos 1.3  ',2019,20000,'gris',TRUE,5,"Automática","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (16,'Ford','Ka se',2017,20000,'rojo',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (17,'Hyundai','Grand ',2017,20000,'gris',TRUE,5,"Automática","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (18,'Kia','Rio ',2021,20000,'rojo',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (19,'Peugeot','208 feline ',2014,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (20,'Renault','Sandero ',2018,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (21,'Toyota','Yaris ',2020,20000,'negro',TRUE,5,"automatica","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (22,'Volkswagen','Voyage ',2015,20000,'gris',TRUE,5,"manual","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (23,'Volkswagen','Voyage ',2017,20000,'gris',TRUE,5,"automatica","mediano" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (24,'Chevrolet','Captiva ',2016,20000,'gris',TRUE,7,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (25,'Chevrolet','Spin ',2022,20000,'azul',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (26,'Dodge','Journey ',2017,20000,'negro',TRUE,7,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (27,'Ford','Eco sport se ',2015,20000,'blanco',TRUE,5,"manual","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (28,'Honda','Civic ',2015,20000,'blanco',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (29,'Hyundai','H1 ',2015,20000,'blanco',TRUE,12,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (30,'Mercedes benz','Vito ',2018,20000,'blanco',TRUE,7,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (31,'Mercedes benz','Vito ',2018,20000,'negro',TRUE,7,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (32,'Nissan','Kicks ',2019,20000,'negro',TRUE,5,"manual","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (33,'Nissan','New versa ',2021,20000,'negro',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (34,'Nissan','versa exclusive ',2017,20000,'gris',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (35,'Peugeot','408 ',2013,20000,'negro',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (36,'Renault','Duster ',2012,20000,'gris',TRUE,5,"manual","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (37,'Renault','Logan ',2017,20000,'gris',TRUE,5,"manual","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (38,'Toyota','Corolla ',2022,20000,'gris',TRUE,5,"automatica","grande" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (39,'Chevrolet','S 10 ',2022,20000,'gris',TRUE,5,"automatica","camioneta" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (40,'Fiat','Strada volcano ',2022,20000,'negro',TRUE,5,"manual","camioneta" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (41,'Ford','Ranger 2.2 ',2017,20000,'blanco',TRUE,5,"manual","camioneta" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (42,'Renault','Alaskan ',2022,20000,'marron',TRUE,5,"manual","camioneta" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (43,'Toyota','Hilux 3.0 ',2015,20000,'blanco',TRUE,5,"automatica","camioneta" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (44,'Citroen','Berlingo ',2022,20000,'blanco',TRUE,2,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (45,'Lifan','Foison ',2018,20000,'blanco',TRUE,2,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (46,'Peugeot','Partner ',2021,20000,'negro',TRUE,5,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (47,'Renault','Kangoo ',2023,20000,'blanco',TRUE,2,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (48,'Renault','Kangoo ',2017,20000,'blanco',TRUE,5,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (49,'Toyota','Hiance ',2023,20000,'blanco',TRUE,2,"manual","van" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (50,'Audi','A6 ',2023,20000,'negro',TRUE,4,"automatica","premiun" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (51,'Audi','A6 ',2012,20000,'blanco',TRUE,4,"automatica","premiun" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (52,'Honda','Civic exl ',2017,20000,'negro',TRUE,5,"automatica","premiun" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (53,'BMW','Mini cooper  ',2014,20000,'rojo',TRUE,4,"automatica","premiun" );
INSERT INTO Autos (id,Marca,Modelo,Año,Kms,Color,Aire_acondicionado ,Pasajeros,trasmision,Tipo ) VALUES (54,'Mercedes benz','Smart fortwo  ',2013,20000,'blanco',TRUE,2,"automatica","premiun" );













































SELECT * FROM Autos



