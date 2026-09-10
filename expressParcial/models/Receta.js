const mongoose = require('mongoose');

const ingredienteSchema = new mongoose.Schema({
    nombre: String,
    cantidad: String,
    unidad: String
});

const recetaSchema = new mongoose.Schema({
    nombre: String,
    tiempoPreparacion: String,
    origen: {
        region: String,
        pais: String
    },
    ingredientes: [ingredienteSchema]
}, { collection: 'recetas_examen' }); // Apunta a la colección de la receta

module.exports = mongoose.model('Receta', recetaSchema);