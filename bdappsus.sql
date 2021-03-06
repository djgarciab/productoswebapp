
-- Tablas 
CREATE TABLE productos (
    proid         NUMBER NOT NULL,
    pronombre     VARCHAR2(50) NOT NULL,
    proprecio     VARCHAR2(20) NOT NULL,
    procantidad   NUMBER NOT NULL,
    tipid         NUMBER NOT NULL,
    usuid         NUMBER NOT NULL
);


ALTER TABLE productos ADD CONSTRAINT producto_pk PRIMARY KEY ( proid );



CREATE TABLE tipos (
    tipid            NUMBER NOT NULL,
    tipnombre        VARCHAR2(30) NOT NULL,
    tipdescripcion   VARCHAR2(200)
);

ALTER TABLE tipos ADD CONSTRAINT tipo_pk PRIMARY KEY ( tipid );

CREATE TABLE usuarios (
    usuid           NUMBER NOT NULL,
    usunombre       VARCHAR2(30) NOT NULL,
    usucontrasena   VARCHAR2(100) NOT NULL
);

ALTER TABLE usuarios ADD CONSTRAINT usuario_pk PRIMARY KEY ( usuid );

ALTER TABLE productos
    ADD CONSTRAINT producto_tipo_fk FOREIGN KEY ( tipid )
        REFERENCES tipos ( tipid );

ALTER TABLE productos
    ADD CONSTRAINT producto_usuario_fk FOREIGN KEY ( usuid )
        REFERENCES usuarios ( usuid );


--secuencias

CREATE SEQUENCE SEC_PROID
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER INSERTAR_PRODUCTO
BEFORE INSERT ON PRODUCTOS
FOR EACH ROW
BEGIN
    SELECT SEC_PROID.NEXTVAL
    INTO :NEW.PROID
    FROM DUAL;
END;
--
CREATE SEQUENCE SEC_TIPID
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER INSERTAR_TIPO
BEFORE INSERT ON TIPOS
FOR EACH ROW
BEGIN
    SELECT SEC_TIPID.NEXTVAL
    INTO :NEW.TIPID
    FROM DUAL;
END;
--
CREATE SEQUENCE SEC_USUID
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER INSERTAR_USUARIO
BEFORE INSERT ON USUARIOS
FOR EACH ROW
BEGIN
    SELECT SEC_USUID.NEXTVAL
    INTO :NEW.USUID
    FROM DUAL;
END;

INSERT INTO USUARIOS(USUNOMBRE,USUCONTRASENA)
VALUES('ADMIN','ADMIN');

INSERT INTO USUARIOS(USUNOMBRE,USUCONTRASENA)
VALUES('USER','PASS');

INSERT INTO USUARIOS(USUNOMBRE,USUCONTRASENA)
VALUES('USER1','USER1');

INSERT INTO TIPOS(TIPNOMBRE,TIPDESCRIPCION)
VALUES('TIPO A','Descripcion del producto de tipo a');

INSERT INTO TIPOS(TIPNOMBRE,TIPDESCRIPCION)
VALUES('TIPO B','Descripcion del producto de tipo b');

INSERT INTO TIPOS(TIPNOMBRE,TIPDESCRIPCION)
VALUES('TIPO C','Descripcion del producto de tipo c');

INSERT INTO PRODUCTOS(PRONOMBRE,PROPRECIO,PROCANTIDAD,TIPID,USUID)
VALUES('Producto SW ','1000',20,1,1);

INSERT INTO PRODUCTOS(PRONOMBRE,PROPRECIO,PROCANTIDAD,TIPID,USUID)
VALUES('APP WEB','12000',23,1,1);

INSERT INTO PRODUCTOS(PRONOMBRE,PROPRECIO,PROCANTIDAD,TIPID,USUID)
VALUES('APP movil','15000',5,1,1);

SELECT * FROM USUARIOS;
SELECT * FROM TIPOS;
SELECT * FROM PRODUCTOS;
