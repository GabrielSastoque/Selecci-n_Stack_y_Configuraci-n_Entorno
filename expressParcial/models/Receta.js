const mongoose = require('mongoose');

// 1. Esquema individual para los objetos dentro del arreglo de ingredientes
const ingredienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  unidad: { type: String, required: true }
});

// 2. Esquema principal para el documento de la receta
const recetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipoCocina: { type: String, required: true },
  tiempoPreparacion: { type: String, required: true },
  ingredientes: [ingredienteSchema], // Arreglo de objetos
  origen: {                          // Campo anidado simple
    region: { type: String },
    pais: { type: String }
  }
});

// 3. Apuntador obligatorio a la colección 'recetas_examen'
module.exports = mongoose.model('Receta', recetaSchema, 'recetas_examen');