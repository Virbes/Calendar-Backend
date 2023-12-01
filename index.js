const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear el servidor de Express
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use(express.static('public'));

// Reading and parsing the body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});