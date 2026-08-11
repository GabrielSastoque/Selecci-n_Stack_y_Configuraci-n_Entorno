/*
const express = require('express');
const app = express();
const PORT = 3000;

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

const libros = [
  {
    id: '1',
    titulo: 'Cien años de soledad',
    paginas: 417,
    disponibles: 3, // Campo numérico para el condicional
    editorial: { nombre: 'Editorial Sudamericana', contacto: 'contacto@sudamericana.com' }, // Objeto anidado
    resumen: 'La épica historia de la familia Buendía a lo largo de siete generaciones en el pueblo de Macondo.'
  },
  {
    id: '2',
    titulo: 'Don Quijote de la Mancha',
    paginas: 863,
    disponibles: 0,
    editorial: { nombre: 'Real Academia Española', contacto: 'info@rae.es' },
    resumen: 'Las famosas aventuras del hidalgo Don Quijote y su fiel escudero Sancho Panza.'
  },
  {
    id: '3',
    titulo: 'El principito',
    paginas: 96,
    disponibles: 5,
    editorial: { nombre: 'Éditions Gallimard', contacto: 'contact@gallimard.fr' },
    resumen: 'Un relato poético sobre un pequeño príncipe que viaja por diversos asteroides en el universo.'
  },
  {
    id: '4',
    titulo: '1984',
    paginas: 328,
    disponibles: 0,
    editorial: { nombre: 'Secker & Warburg', contacto: 'info@seckerwarburg.co.uk' },
    resumen: 'Una inolvidable novela distópica sobre el totalitarismo y la vigilancia constante del Gran Hermano.'
  }
];

app.get('/', (req, res) => {
  res.render('index', { libros });
});

app.get('/libro/:id', (req, res) => {
  const libro = libros.find(l => l.id === req.params.id);
  if (!libro) {
    return res.status(404).send('Libro no encontrado en el catálogo');
  }
  res.render('detalle', { libro });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

 */

const express = require('express');
const { sequelize, Editorial, Libro } = require('./database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Ruta Principal: Obtiene todos los libros desde la Base de Datos (con su Editorial)
app.get('/', async (req, res) => {
  try {
    const libros = await Libro.findAll({ include: Editorial });
    res.render('index', { libros });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Ruta Dinámica de Detalle: Obtiene un libro por su ID desde la BD
app.get('/libro/:id', async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id, { include: Editorial });
    if (!libro) {
      return res.status(404).send('Libro no encontrado en la base de datos');
    }
    res.render('detalle', { libro });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el detalle del libro');
  }
});

// Sincronizar la Base de Datos e Iniciar el Servidor
sequelize.sync().then(async () => {
  console.log('Conectado a SQLite mediante Sequelize.');

  // Si la tabla está vacía, insertamos datos iniciales de prueba (Seeding)
  const cantidadEditoriales = await Editorial.count();
  if (cantidadEditoriales === 0) {
    const ed1 = await Editorial.create({ nombre: 'Planeta', contacto: 'contacto@planeta.es' });
    const ed2 = await Editorial.create({ nombre: 'Debolsillo', contacto: 'info@debolsillo.com' });

    await Libro.bulkCreate([
      { titulo: 'Cien años de soledad', resumen: 'Una obra maestra del realismo mágico.', paginas: 417, disponibles: 5, editorialId: ed1.id },
      { titulo: '1984', resumen: 'Una distopía sobre el control y la vigilancia estatal.', paginas: 328, disponibles: 0, editorialId: ed2.id },
      { titulo: 'El principito', resumen: 'Una fábula poética sobre el sentido de la vida y la amistad.', paginas: 96, disponibles: 3, editorialId: ed1.id },
      { titulo: 'Don Quijote de la Mancha', resumen: 'Las divertidas e ingeniosas aventuras del hidalgo don Quijote.', paginas: 863, disponibles: 2, editorialId: ed2.id }
    ]);
    console.log('🌱 Datos de prueba insertados en la base de datos.');
  }

  app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
  });
});