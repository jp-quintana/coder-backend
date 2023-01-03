# Instrucciones

## Tercera Entrega Final

### Registro Usuario

- Base de datos:

![Registro usuario](https://user-images.githubusercontent.com/87621233/210141159-4b3267bf-d9d5-4880-9a35-d633f1d5bc80.png)

- Email administrador:

![Registro Usuario Email](https://user-images.githubusercontent.com/87621233/210141292-f4d80023-1691-4c7a-8392-7a50a5746655.png)

- Vista Usuario:

![Vista Usuario](https://user-images.githubusercontent.com/87621233/210142940-665dea0d-961b-4034-89ad-1f11301a2e27.png)

### Finalizar compra

- Email administrador:

![Finalizar Compra Email](https://user-images.githubusercontent.com/87621233/210141517-60d66a22-22e7-4651-af5d-80edccf7f9f8.png)

### Admin

Para poder tener accesos a rutas privilegiadas conectarse con el siguiente usuario:

- User: admin@gmail.com
- Password: password123

- Vista Admin

![Vista Admin](https://user-images.githubusercontent.com/87621233/210142995-d1cc515f-eda6-4257-b133-bc7ed01b98b5.png)

### Modo Cluster
Para habilitar modo cluster utilizar command "npm run cluster"
## DAO (NO FUNCIONA. USAR MONGOOSE)

### Mongoose + Mongo

1. Agregar connection string del cluster de mongo dentro de la carpeta db/mongoConfig.js
2. Descomentar dbConnect y comentar app.listen en server.js
3. Comentar/descomentar como corresponda variables productDb y cartDb en los archivos dentro de la carpeta /controllers
4. Descomentar lineas de Mongoose y comentar lineas fs/Firebase en los archivos dentro de la carpeta /controllers

### Fs / Firebase

1. Agregar archivo json con la private key de firebase dentro de la carpeta /db
2. Comentar dbConnect y descomentar app.listen en server.js
3. Comentar/descomentar como corresponda variables productDb y cartDb en los archivos dentro de la carpeta /controllers
4. Comentar lineas de Mongoose y descomentar lineas fs/Firebase en los archivos dentro de la carpeta /controllers

### Importante

Cuando se cambia de db hay que eliminar el id del cart en el local storage del browser sino se rompe la app.
