Create database T13
use T13

 create table socios(
  documento char(8) not null,
  nombre varchar(40),
  domicilio varchar(30),
  constraint PK_socios_documento
   primary key (documento)
 );

 create table profesores(
  documento char(8) not null,
  nombre varchar(40),
  domicilio varchar(30),
  constraint PK_profesores_documento
   primary key (documento)
 );

 create table cursos(
  numero tinyint identity,
  deporte varchar(20),
  dia varchar(15),
   constraint CK_inscritos_dia check (dia in('lunes','martes','miercoles','jueves','viernes','sabado')),
  documentoprofesor char(8),
  constraint PK_cursos_numero
   primary key (numero),
 );

 create table inscritos(
  documentosocio char(8) not null,
  numero tinyint not null,
  matricula char(1),
  constraint CK_inscritos_matricula check (matricula in('s','n')),
  constraint PK_inscritos_documento_numero
   primary key (documentosocio,numero)
 );

/* 2- Ingrese algunos registros para todas las tablas: */
 insert into socios values('30000000','Fabian Fuentes','Caseros 987');
 insert into socios values('31111111','Gaston Garcia','Guemes 65');
 insert into socios values('32222222','Hector Huerta','Sucre 534');
 insert into socios values('33333333','Ines Irala','Bulnes 345');

 insert into profesores values('22222222','Ana Acosta','Avellaneda 231');
 insert into profesores values('23333333','Carlos Caseres','Colon 245');
 insert into profesores values('24444444','Daniel Duarte','Sarmiento 987');
 insert into profesores values('25555555','Esteban Lopez','Sucre 1204');

 insert into cursos values('tenis','lunes','22222222');
 insert into cursos values('tenis','martes','22222222');
 insert into cursos values('natacion','miercoles','22222222');
 insert into cursos values('natacion','jueves','23333333');
 insert into cursos values('natacion','viernes','23333333');
 insert into cursos values('futbol','sabado','24444444');
 insert into cursos values('futbol','lunes','24444444');
 insert into cursos values('basquet','martes','24444444');

 insert into inscritos values('30000000',1,'s');
 insert into inscritos values('30000000',3,'n');
 insert into inscritos values('30000000',6,null);
 insert into inscritos values('31111111',1,'s');
 insert into inscritos values('31111111',4,'s');
 insert into inscritos values('32222222',8,'s');



/*3- Elimine la vista "vista_club" si existe:*/
 if object_id('vista_club') is not null drop view vista_club;

/*4- Cree una vista en la que aparezca el nombre y documento del socio, el deporte, 
el d�a y el nombre del profesor.*/

CREATE VIEW VISTA_SocioDeporteProfesorDia AS
(
SELECT S.NOMBRE Nombre_Socio,documentosocio, c.dia, P.nombre PROFESOR ,C.deporte DEPORTE FROM inscritos AS I 
INNER JOIN SOCIOS AS S ON i.documentosocio = s.documento
INNER JOIN CURSOS C ON C.numero = I.numero INNER JOIN profesores AS P ON P.documento = C.documentoprofesor
)

/*5- Muestre la informaci�n contenida en la vista.*/
SELECT * FROM VISTA_SocioDeporteProfesorDia

/*6- Realice una consulta a la vista donde muestre la cantidad de socios inscriptos en 
cada deporte ordenados por cantidad.*/
CREATE VIEW vista_SociosInscriptos_Deporte AS 
(
SELECT COUNT(I.documentosocio) INSCRITOS , C.deporte DEPORTE FROM INSCRITOS AS I 
INNER JOIN CURSOS AS C ON I.numero=C.numero GROUP BY c.deporte
)

SELECT * FROM vista_SociosInscriptos_Deporte ORDER BY INSCRITOS

--SELECT * FROM inscritos AS I FULL OUTER JOIN CURSOS AS C ON I.numero=C.numero

--7- Muestre (consultando la vista) los cursos (deporte y d�a) para los cuales no hay inscritos.
CREATE VIEW vista_CursosSinInscritos AS
(
SELECT C.deporte Deporte ,C.DIA Dia ,C.numero FROM inscritos AS I 
FULL OUTER JOIN CURSOS AS C ON I.numero=C.numero 
where i.numero is null
)
--Consulta
SELECT 'No hay inscritos : ', * FROM vista_CursosSinInscritos

--is null es mejor para referencias valores nullos to value=null

--8- Muestre los nombres de los socios que no se han inscrito en ning�n curso (consultando la vista)

CREATE VIEW vista_SociosNoIncriptos AS 
(
SELECT S.documento,S.nombre FROM SOCIOS AS S 
FULL OUTER JOIN inscritos AS I ON s.documento=I.documentosocio WHERE NUMERO IS NULL
)

SELECT 'No esta inscrito : ',* FROM vista_SociosNoIncriptos

--9- Muestre (consultando la vista) los profesores que no tienen asignado ning�n deporte a�n.

CREATE VIEW vista_ProfesorSinCurso AS
(
SELECT P.nombre,C.deporte FROM PROFESORES AS P FULL 
OUTER JOIN CURSOS AS C ON P.documento =C.documentoprofesor WHERE DEPORTE IS NULL
)

SELECT 'NO cuenta con curso asignado : ',* FROM vista_ProfesorSinCurso;

--10- Muestre (Consultando La Vista) el nombre y documento de los socios que deben matr�culas.

CREATE VIEW vista_socioAdeudoMat AS (
SELECT nombre,documento FROM INSCRITOS AS I FULL 
OUTER JOIN SOCIOS AS S ON I.documentosocio=S.documento WHERE I.matricula='n' 
)

SELECT * FROM vista_socioAdeudoMat

--11- Consulte la vista y muestre los nombres de los profesores y los d�as en que asisten al club para impartir sus clases.

CREATE VIEW vista_profesoresAsitDias AS 
(
SELECT nombre,dia FROM profesores AS P INNER JOIN 
CURSOS AS C ON P.documento = C.documentoprofesor
)

SELECT * FROM vista_profesoresAsitDias
--12- Muestre la misma informaci�n anterior pero ordenada por d�a.
SELECT * FROM vista_profesoresAsitDias ORDER BY dia

--13- Muestre todos los socios que son compa�eros en tenis los lunes.
CREATE VIEW vista_sociosLunes AS (
SELECT S.nombre 'Nombre Del Socio',C.dia 'Dia' FROM SOCIOS AS S 
JOIN INSCRITOS AS I ON S.documento=I.documentosocio
JOIN CURSOS AS C ON I.numero=C.numero WHERE dia='Lunes'
)

SELECT * FROM vista_sociosLunes
/*14- Elimine la vista "vista_inscritos" si existe y cr�ela para que muestre la cantidad de 
inscritos por curso, incluyendo el n�mero del curso, el nombre del deporte y el d�a.*/
if object_id('vista_inscritos') is not null drop view vista_inscritos;

CREATE VIEW vista_inscritos AS 
(
SELECT COUNT(documentosocio) Inscritos ,I.numero,C.dia,C.deporte FROM Inscritos AS I 
INNER JOIN CURSOS AS C ON I.numero=C.numero GROUP BY i.numero,c.deporte,C.dia
)

--15- Consulte la vista:
SELECT * FROM vista_inscritos


