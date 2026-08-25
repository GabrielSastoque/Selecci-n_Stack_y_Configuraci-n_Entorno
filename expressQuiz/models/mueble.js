const mongoose = require('mongoose');

const muebleTable = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  disponible: Boolean
});

module.exports = mongoose.model('mueble', muebleTable);
