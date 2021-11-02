const express = require("express");
const saludos = require('./src/routes/saludos');

//SEQUELIZE
const{sequelize} = require('./models/index');




// Crear el servidor
const app = express();

//Rutas
app.use(saludos);

//Uso de bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// puerto de la apps
const port = process.env.PORT || 8080;


//Arrancamos APP
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);  
  
  // Contectandose a la base de datos
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conectado a la base de datos.");
    })
    .catch((err) => {
      console.error("No es posible conectarse a la base de datos:", err);
    });

});

