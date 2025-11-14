const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las marcas
router.get('/', authMiddleware, async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json({ marcas });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
});

// Crear marca
router.post('/', authMiddleware, async (req, res) => {
  try {
    const marca = new Marca({ nombre: req.body.nombre });
    await marca.save();
    res.status(201).json({ marca });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear marca' });
  }
});

// Actualizar marca
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const marca = await Marca.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true }
    );
    res.json({ marca });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar marca' });
  }
});

// Eliminar marca
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Marca.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar marca' });
  }
});

module.exports = router;
