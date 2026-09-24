const mongoose = require('mongoose');

const contenidoSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        director: { type: String, required: true, trim: true },
        genero: { type: String, required: true, trim: true },
        anioEstreno: { type: Number, required: true },
        duracionMinutos: { type: Number, required: true },
        sinopsis: { type: String, trim: true },
        puntuacion: { type: Number, min: 0, max: 5 },
        premios: [{ type: String }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contenido', contenidoSchema);
