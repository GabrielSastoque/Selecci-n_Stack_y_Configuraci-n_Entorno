const express = require('express');
const router = express.Router();
const Receta = require('../models/Receta');

// Consulta y renderiza la vista HTML
router.get('/', async (req, res) => {
  try {
    // Obtenemos el único documento disponible en la colección
    const receta = await Receta.findOne();

    if (!receta) {
      return res.status(404).send('No se encontró ninguna receta en la colección recetas_examen.');
    }

    // Renderizamos la plantilla EJS pasando el documento devuelto
    res.render('receta', { receta });
  } catch (error) {
    res.status(500).send('Error al consultar la receta: ' + error.message);
  }
});

module.exports = router;


