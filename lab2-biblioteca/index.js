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