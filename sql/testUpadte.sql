DROP TABLE IF EXISTS TESTUPDATE
CREATE TABLE TESTUPDATE(id DOUBLE NOT NULL,username VARCHAR(10) NOT NULL,role VARCHAR(10) NOT NULL,telefono NOT NULL,email NOT NULL);
INSERT INTO TESTUPDATE (id,username,role,telefono,email) VALUES (1,'paulhal','admin',123456,"email@ejemplo1.com");
INSERT INTO TESTUPDATE (id,username,role,telefono,email) VALUES (2,'johndoe','guest',123456,"email@ejemplo2.com");
INSERT INTO TESTUPDATE (id,username,role,telefono,email) VALUES (3,'sarahjane','guest',123456,"email@ejemplo3.com");

SELECT * FROM TESTUPDATE