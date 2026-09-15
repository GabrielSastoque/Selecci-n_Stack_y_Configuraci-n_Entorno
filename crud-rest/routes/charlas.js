const express = require('express');
const router = express.Router();
const Charla = require('../models/charla');

// 1. CREATE (Crear charla) -> POST
router.post('/', async (req, res) => {
    try {
        const nuevaCharla = new Charla(req.body);
        await nuevaCharla.save();
        res.status(201).json(nuevaCharla); // 201 Created
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la charla', error: error.message });
    }
});

// 2. READ (Listar todas las charlas) -> GET
router.get('/', async (req, res) => {
    try {
        const todas = await Charla.find();
        res.status(200).json(todas); // 200 OK
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener charlas', error: error.message });
    }
});

// 3. READ (Obtener una charla por ID) -> GET
router.get('/:id', async (req, res) => {
    try {
        const charla = await Charla.findById(req.params.id);
        if (!charla) {
            return res.status(404).json({ mensaje: 'Charla no encontrada' }); // 404 Not Found
        }
        res.status(200).json(charla); // 200 OK
    } catch (error) {
        res.status(500).json({ mensaje: 'ID inválido o error de servidor', error: error.message });
    }
});

// 4. UPDATE (Actualizar charla por ID) -> PUT
router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Charla.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizada) {
            return res.status(404).json({ mensaje: 'Charla no encontrada para actualizar' });
        }
        res.status(200).json(actualizada); // 200 OK
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la charla', error: error.message });
    }
});

// 5. DELETE (Eliminar charla por ID) -> DELETE
router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await Charla.findByIdAndDelete(req.params.id);
        if (!eliminada) {
            return res.status(404).json({ mensaje: 'Charla no encontrada para eliminar' });
        }
        res.status(204).send(); // 204 No Content (Éxito sin cuerpo de respuesta)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la charla', error: error.message });
    }
});

module.exports = router;