//const express = require('express'); //vercion commonjs
import express from 'express'; //vercion de imports forma actual
import router from './routes/index.js';
import db from './config/db.js';


const app = express();


//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch( error => console.log(error));


//Definir Puerto
const port = process.env.PORT || 4000;


//Habilitar PUG
app.set('view engine', 'pug');


//Obtener el año actual app.use responde a todos los verbos put,patch, delite, get, post
app.use( (req, res, next) => {
    res.locals.year = new Date().getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    next();//esto es necesario para el paso de variable desde aqui, si no se sigue la peticion y no para o marca pagina no encontrada
});


//Agregar body parser para leer los datos del formualrio
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta publica
app.use(express.static('public'));

//agregar router
//use soporta todos los verbos http
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})