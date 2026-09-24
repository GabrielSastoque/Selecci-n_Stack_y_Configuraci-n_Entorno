const express = require('express');
const mongoose = require('mongoose');
const Contenido = require('../models/Contenido');

const router = express.Router();

const esIdValido = (id) => mongoose.isValidObjectId(id);

const responderError = (res, error, mensaje) => {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({
            mensaje,
            error: error.message
        });
    }

    return res.status(500).json({
        mensaje: 'Error interno del servidor',
        error: error.message
    });
};

router.get('/', async (req, res) => {
    try {
        const contenidos = await Contenido.find();
        return res.status(200).json(contenidos);
    } catch (error) {
        return responderError(res, error, 'Error al obtener contenidos');
    }
});

router.get('/:id', async (req, res) => {
    if (!esIdValido(req.params.id)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }

    try {
        const contenido = await Contenido.findById(req.params.id);

        if (!contenido) {
            return res.status(404).json({ mensaje: 'Contenido no encontrado' });
        }

        return res.status(200).json(contenido);
    } catch (error) {
        return responderError(res, error, 'Error al obtener el contenido');
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoContenido = await Contenido.create(req.body);
        return res.status(201).json(nuevoContenido);
    } catch (error) {
        return responderError(res, error, 'Error al crear el contenido');
    }
});

router.put('/:id', async (req, res) => {
    if (!esIdValido(req.params.id)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }

    try {
        const contenidoActualizado = await Contenido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!contenidoActualizado) {
            return res.status(404).json({ mensaje: 'Contenido no encontrado para actualizar' });
        }

        return res.status(200).json(contenidoActualizado);
    } catch (error) {
        return responderError(res, error, 'Error al actualizar el contenido');
    }
});

router.delete('/:id', async (req, res) => {
    if (!esIdValido(req.params.id)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }

    try {
        const contenidoEliminado = await Contenido.findByIdAndDelete(req.params.id);

        if (!contenidoEliminado) {
            return res.status(404).json({ mensaje: 'Contenido no encontrado para eliminar' });
        }

        return res.status(200).json({
            mensaje: 'Contenido eliminado correctamente',
            contenido: contenidoEliminado
        });
    } catch (error) {
        return responderError(res, error, 'Error al eliminar el contenido');
    }
});

module.exports = router;
