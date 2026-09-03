const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');

const parteARouter = require('./routes/parteA');
const recetasRouter = require('./routes/recetas');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar conexión a MongoDB Atlas
conectarDB();

// Configuración de Motor de Plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/parteA', parteARouter);
app.use('/recetas', recetasRouter);

// Redireccionar raíz a la vista de recetas
app.get('/', (req, res) => {
  res.redirect('/recetas');
});

// Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
