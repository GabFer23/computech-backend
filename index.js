const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// ! =============================================================================================

// ? Crear servidor
const app = express();

// ? Database
dbConnection();


// ? Directrio público
app.use(express.static('public'));

// ? Lectura y parseo del body
app.use(express.json());

// ? CORS
// const whitelist = [process.env.FRONTEND_URL];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS error'));
//     }
//   },
// };

app.use(cors());

// ! =============================================================================================
// * ========================== RUTAS DE LA APLICACIÓN ==========================

app.use('/api/auth', require('./routes/auth'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/computers', require('./routes/computers'));

// ! =============================================================================================

const PORT = process.env.PORT || 4000;

// ? Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
