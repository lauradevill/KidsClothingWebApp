# KidsClothingWebApp
Esta aplicación web permite a los empleados de la empresa gestionar las ordenes

# PRE-REQUISITOS
Entorno:

Back-end: Java 11-Spring Boot-JPA-Maven
IDE: Intellij IDEA
Base de datos: MongoDB

Front-end: 
IDE: Visual Studio Code, libreria jquery, framework bootstrap

# PRUEBAS
De APIRest con el cliente Postman, realizando peticiones HTTP a los endpoints dados en las clases Controller del back-end

# DESPLIEGUE
El proyecto está configurado para correr en local en el puerto 8080

Para realizar el despliegue:
1. La base de datos a usar es MongoDB, en el archivo application.properties se encuentra la configuración y se debe crear una base de datos con nombre (preferiblemente con nombre g8, sino el que se prefiera pero se debe cambiar las variables de entorno en application.properties
2. Una vez modificadas las variables de entorno en application.properties se debe compilar el Back-end preferiblemente en Intellij IDEA
3. Mediante postman se crerán algunos usuarios y productos para poder visualizar el funcionamiento de la aplicación web:

USUARIOS
-endpoint: http://localhost:8080/api/user/new
-con este body en formato JSON:

USUARIO 1:
{ 
 "id": 1, 
 "identification": "100", 
 "name": "Alejandra", 
 "birthtDay": "1998-11-15T05:00:00.000+00:00", 
 "monthBirthtDay": "11", 
 "address": "calle 100", 
 "cellPhone": "100100", 
 "email": "alejandra@gmail.com", 
 "password": "A1234", 
 "zone": "Comuna 12 Cabecera del Llano", 
 "type": "ADM" 
}
USUARIO 2:
{ 
 "id": 2, 
 "identification": "200", 
 "name": "María", 
 "birthtDay": "1999-11-15T05:00:00.000+00:00", 
 "monthBirthtDay": "11", 
 "address": "calle 200", 
 "cellPhone": "200200", 
 "email": "maria@gmail.com", 
 "password": "M1234", 
 "zone": "Comuna 11 Sur", 
 "type": "COORD" 
}
USUARIO 3:
{ 
 "id": 3, 
 "identification": "300", 
 "name": "Luisa", 
 "birthtDay": "2000-11-15T05:00:00.000+00:00", 
 "monthBirthtDay": "11", 
 "address": "calle 300", 
 "cellPhone": "300300", 
 "email": "luisa@gmail.com", 
 "password": "L1234", 
 "zone": "Comuna 17 Mutis", 
 "type": "ASE" 
}

PRODUCTOS
-endpoint: http://localhost:8080/api/clothe/new
-con este body en formato JSON:
PRODUCTO 1:
{ 
 "reference": "AP-100", 
 "category": "CATEGORIA 1", 
 "size": "S", 
 "description": "DESCRIPCION 1", 
 "availability": true, 
 "price": 15000, 
 "quantity": 10, 
 "photography": "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg" 
 }
 PRODUCTO 2:
 { 
 "reference": "AP-200", 
 "category": "CATEGORIA 2", 
 "size": "M", 
 "description": "DESCRIPCION 2", 
 "availability": true, 
 "price": 20000, 
 "quantity": 10, 
 "photography": "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg" 
 }
 PRODUCTO 3:
 { 
 "reference": "AP-300", 
 "category": "CATEGORIA 3", 
 "size": "L", 
 "description": "DESCRIPCION 3", 
 "availability": true, 
 "price": 30000, 
 "quantity": 10, 
 "photography": "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg" 
 }
 
 
4. Luego de compilar en back-end y realizar la creación de productos, ingresar en el navegador: http://localhost:8080/ 


# CONSTRUIDO CON
Back-end: Java 11-Spring boot-JPA-Maven
Base de datos: MongoDB
Front-end: JavaScript, HTML, CSS, Bootstrap, Jquery

# AUTOR
Laura De Villeros
