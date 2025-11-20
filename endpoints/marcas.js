const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca');

router.get('/', async (req, res) => {
  const marcas = await Marca.find();
  res.json(marcas);
});

router.get('/:id', async (req, res) => {
  const marca = await Marca.findById(req.params.id);
  if (!marca) return res.status(404).send('Marca no encontrada');
  res.json(marca);
});

router.post('/', async (req, res) => {
  const marca = new Marca(req.body);
  await marca.save();
  res.status(201).json(marca);
});

router.put('/:id', async (req, res) => {
  const marca = await Marca.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!marca) return res.status(404).send('Marca no encontrada');
  res.json(marca);
});

router.delete('/:id', async (req, res) => {
  const marca = await Marca.findByIdAndDelete(req.params.id);
  if (!marca) return res.status(404).send('Marca no encontrada');
  res.send('Marca eliminada');
});

module.exports = router;
