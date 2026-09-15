const mongoose = require('mongoose');

const charlaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    hora: { type: String, required: true },
    cupos: { type: Number, required: true }
});

module.exports = mongoose.model('Charla', charlaSchema);