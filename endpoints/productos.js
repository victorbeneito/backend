const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// GET /api/productos (devuelve JSON)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/productos/:id (devuelve JSON)
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/productos (añadir, JSON)
router.post('/', async (req, res) => {
  try {
    const imagenes = req.body.imagenes
      ? req.body.imagenes.split(',').map(s => s.trim())
      : [];

    const { nombre, marca, categoria, descripcion } = req.body;
    const precio = parseFloat(req.body.precio);
    const stock = parseInt(req.body.stock, 10);

    const productoData = {
      nombre,
      marca,
      categoria,
      descripcion,
      precio,
      stock,
      imagenes,
    };

    const producto = new Producto(productoData);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/productos/:id (actualizar, JSON)
router.put('/:id', async (req, res) => {
  try {
    const imagenes = req.body.imagenes
      ? req.body.imagenes.split(',').map(s => s.trim())
      : [];

    const { nombre, marca, categoria, descripcion } = req.body;
    const precio = parseFloat(req.body.precio);
    const stock = parseInt(req.body.stock, 10);

    const updateData = {
      nombre,
      marca,
      categoria,
      descripcion,
      precio,
      stock,
      imagenes,
    };

    const producto = await Producto.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/productos/:id (borrar, JSON)
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.send('Producto eliminado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// DELETE /productos/:id - borra producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.send('Producto eliminado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
