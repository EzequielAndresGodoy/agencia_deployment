import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//conectar la base de datos
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(error => console.error(error))

//Habilitar PUG (template engine)
app.set('view engine', 'pug');

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

// Obtener el año actual
app.use( (req, res, next) => {
  const year = new Date();

  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';
  //next(); ---- Se pone next() pero si tira error hay que forzarlo poniendo return
  return next();
});

//Definir la carpeta publica
app.use(express.static('public'))

//Agregar router
app.use('/', router);

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
})