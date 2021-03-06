const express = require("express");
const saludos = require('./src/routes/saludos');
const socios = require('./src/routes/socios');

//SEQUELIZE
const{sequelize} = require('./models/index');

// Crear el servidor
const app = express();

//Uso de bodyParser ; Importatn : put codelines before of load the routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
app.use(saludos);
app.use(socios);

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

