const express = require('express');
const conectarDB = require('./config/db');
const charlasRouter = require('./routes/charlas');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
conectarDB();

// Middleware para JSON
app.use(express.json());

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Ruta raíz renderizando HTML
app.get('/', async (req, res) => {
    const Charla = require('./models/charla');
    const charlas = await Charla.find();
    res.render('index', { charlas }); // Renderiza views/index.ejs
});

// 2. Rutas principales de la API
app.use('/api/charlas', charlasRouter);

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor REST corriendo en http://localhost:${PORT}`);
});