const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    nombre: String,
    idUniversidad: String,
    hobby: String
}, { collection: 'asistencias' }); // Apunta explícitamente a la colección "asistencias"

module.exports = mongoose.model('Asistencia', asistenciaSchema);