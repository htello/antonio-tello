const express = require('express');
require('dotenv').config()
const cors = require('cors')
const { dbConection } = require('./database/config');

// Crear Servidor Express
const app = express();

//Conexion base de datos
dbConection()

//cors
app.use(cors())

//Directorio publico
app.use(express.static(__dirname + '/public'))

// Lectura y parseo del body
app.use(express.json());

// RUTAS
//TODO auths - crear editar rew
app.use('/api/auth', require('./routes/auth'))
//TODO crud - eventos
app.use('/api/pintura', require('./routes/pintura'))



//Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor en el puerto ${process.env.PORT}`)
})