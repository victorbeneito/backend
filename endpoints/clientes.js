const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.json(cliente);
});

router.post('/', async (req, res) => {
  const cliente = new Cliente(req.body);
  await cliente.save();
  res.status(201).json(cliente);
});

router.put('/:id', async (req, res) => {
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.json(cliente);
});

router.delete('/:id', async (req, res) => {
  const cliente = await Cliente.findByIdAndDelete(req.params.id);
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.send('Cliente eliminado');
});

module.exports = router;
