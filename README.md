# JokesAPIProject
API de chistes desarrollada por Abraham Carranza, Diana Rodriguez y Abraham Carranza

Para iniciar la ejecución del script / servidor usar:

node src/index.js

Desde la terminal con la direccion raiz del proyecto ProyectoJokesAPI

ENDPOINTS: (probados desde Postman Desktop)

GET. Obtener un chiste.
Para obtener un chiste de Chuck Norris:

GET http://localhost:3005/api/getJoke?param=Chuck

Para obtener un Dad Joke:

GET http://localhost:3005/api/getJoke?param=Dad

Para obtener un chiste de la base de datos / propio :

GET http://localhost:3005/api/getJoke?param=Propio

POST. Crear un chiste.
Para crear un chiste :

POST http://localhost:3005/api/createJoke

Ejemplo para prueba :

{ "text": "¿Cómo se despiden los químicos? ¡Ácido un placer!", "author": "Pepe", "rating": 5, "category": "Malo" }

PUT. Actualizar un chiste.
PUT http://localhost:3005/api/updateJoke/id

Ejemplo para prueba :

http://localhost:3005/api/updateJoke/677740b3bbde196c29c67b55

{ "category": "Chistoso" }

DELETE. Borrar un chiste.
DELETE http://localhost:3005/api/deleteJoke/:id

GET. Obtener un chiste por ID.
GET http://localhost:3005/api/getJokeById/:id

GET. Obtener cantidad de chistes por categoria.

GET. Obtener todos los chistes que hay por puntaje.

PRUEBAS UNITARIAS.

Utilizar el comando:

npm test

Desde la terminal con la direccion raiz del proyecto ProyectoJokesAPI

COMENTARIOS. Dificultades : Aprender a usar Jest para las pruebas unitarias. El uso de las ramas en flujo Gitflow.

DEPENDENCIAS: 
npm init -y
npm install express mongoose axios
npm install dotenv
npm install cors
npm install --save-dev jest supertest
npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript babel-jest
npm install --save-dev mongodb-memory-server
npm install --save-dev cross-env
npm install swagger swagger-jsdoc swagger-ui-express
git flow init

Instalarlas con 

npm install
