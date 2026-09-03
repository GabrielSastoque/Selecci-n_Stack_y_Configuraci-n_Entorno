const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  idUniversidad: { type: String, required: true },
  hobbie: { type: String, required: true } // Campo adicional propio
});

// Forzamos el nombre explícito de la colección 'asistencias'
module.exports = mongoose.model('Asistencia', asistenciaSchema, 'asistencias');
