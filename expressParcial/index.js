const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');
const Receta = require('./models/Receta');

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (Parte B)
app.get('/', async (req, res) => {
    try {
        const receta = await Receta.findOne(); // Obtiene el único documento disponible
        res.render('index', { receta });
    } catch (error) {
        console.error('Error al obtener la receta:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});