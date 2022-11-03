
# Instrucciones

## Mongoose + Mongo
1. Agregar connection string del cluster de mongo dentro de la carpeta db/mongoConfig.js
2. Descomentar dbConnect y comentar app.listen en server.js
3. Comentar/descomentar como corresponda variables productDb y cartDb en los archivos dentro de la carpeta /controllers
4. Descomentar lineas de Mongoose y comentar lineas fs/Firebase en los archivos dentro de la carpeta /controllers

## Fs / Firebase
1. Agregar archivo json con la private key de firebase dentro de la carpeta /db
2. Comentar dbConnect y descomentar app.listen en server.js
3. Comentar/descomentar como corresponda variables productDb y cartDb en los archivos dentro de la carpeta /controllers
4. Comentar lineas de Mongoose y descomentar lineas fs/Firebase en los archivos dentro de la carpeta /controllers

## Importante

Cuando se cambia de db hay que eliminar el id del cart en el local storage del browser sino se rompe la app.



