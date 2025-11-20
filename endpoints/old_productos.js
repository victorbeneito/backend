const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// GET /productos - lista todos
router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// GET /productos/:id - busca por id
router.get('/:id', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.json(producto);
});

// POST /productos - añade producto
router.post('/', async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.status(201).json(producto);
});

// PUT /productos/:id - actualiza producto
router.put('/:id', async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.json(producto);
});

// DELETE /productos/:id - borra producto
router.delete('/:id', async (req, res) => {
  const producto = await Producto.findByIdAndDelete(req.params.id);
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.send('Producto eliminado');
});

module.exports = router;

