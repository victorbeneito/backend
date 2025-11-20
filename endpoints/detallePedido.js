const express = require('express');
const router = express.Router();
const DetallePedido = require('../models/DetallePedido');

router.get('/', async (req, res) => {
  const detalles = await DetallePedido.find().populate('pedido producto');
  res.json(detalles);
});

router.get('/:id', async (req, res) => {
  const detalle = await DetallePedido.findById(req.params.id).populate('pedido producto');
  if (!detalle) return res.status(404).send('Detalle no encontrado');
  res.json(detalle);
});

router.post('/', async (req, res) => {
  const detalle = new DetallePedido(req.body);
  await detalle.save();
  res.status(201).json(detalle);
});

router.put('/:id', async (req, res) => {
  const detalle = await DetallePedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!detalle) return res.status(404).send('Detalle no encontrado');
  res.json(detalle);
});

router.delete('/:id', async (req, res) => {
  const detalle = await DetallePedido.findByIdAndDelete(req.params.id);
  if (!detalle) return res.status(404).send('Detalle no encontrado');
  res.send('Detalle eliminado');
});

module.exports = router;
