const express = require('express');
const router = express.Router();
const mueble = require('../models/mueble');

// CREATE
router.post('/', async (req, res) => {
  const nueva = await mueble.create(req.body);
  res.json(nueva);
});

// READ
router.get('/', async (req, res) => {
  const todas = await mueble.find();
  res.json(todas);
});

// UPDATE
router.put('/:id', async (req, res) => {
  await mueble.updateOne({ _id: req.params.id }, req.body);
  res.sendStatus(200);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await mueble.deleteOne({ _id: req.params.id });
  res.sendStatus(200);
});

module.exports = router;
