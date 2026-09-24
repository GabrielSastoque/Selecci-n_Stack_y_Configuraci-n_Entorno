const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');
const contenidosRouter = require('./routes/contenido');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
conectarDB();

// Middleware para JSON
app.use(express.json());

// Rutas principales de la API
app.use('/api/contenidos', contenidosRouter);

// Servir la aplicación React compilada.
const frontendPath = path.join(__dirname, 'dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor REST corriendo en http://localhost:${PORT}`);
});