const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

router.get('/', async (req, res) => {
  const pedidos = await Pedido.find().populate('cliente');
  res.json(pedidos);
});

router.get('/:id', async (req, res) => {
  const pedido = await Pedido.findById(req.params.id).populate('cliente');
  if (!pedido) return res.status(404).send('Pedido no encontrado');
  res.json(pedido);
});

router.post('/', async (req, res) => {
  const pedido = new Pedido(req.body);
  await pedido.save();
  res.status(201).json(pedido);
});

router.put('/:id', async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pedido) return res.status(404).send('Pedido no encontrado');
  res.json(pedido);
});

router.delete('/:id', async (req, res) => {
  const pedido = await Pedido.findByIdAndDelete(req.params.id);
  if (!pedido) return res.status(404).send('Pedido no encontrado');
  res.send('Pedido eliminado');
});

module.exports = router;
