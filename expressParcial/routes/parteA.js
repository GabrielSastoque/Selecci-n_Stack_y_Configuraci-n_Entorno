const express = require('express');
const router = express.Router();
const Asistencia = require('../models/Asistencia');

// Ruta para ejecutar la inserción de tu perfil
router.get('/crear-perfil', async (req, res) => {
  try {
    const nuevoPerfil = await Asistencia.create({
      nombre: 'Tu Nombre Completo Aquí',       // <-- Reemplaza con tus datos reales
      idUniversidad: 'TU_ID_ESTUDIANTIL_123',  // <-- Reemplaza con tu ID real
      hobbie: 'Programación Web y Videojuegos' // <-- Tu campo adicional elegido
    });

    res.status(201).json({
      mensaje: 'Perfil creado exitosamente en la colección asistencias',
      documentoCreado: nuevoPerfil
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el perfil: ' + error.message });
  }
});

module.exports = router;


