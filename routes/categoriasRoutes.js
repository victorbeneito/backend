const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las categorías
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json({ categorias });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Crear categoría
router.post('/', authMiddleware, async (req, res) => {
  try {
    const categoria = new Categoria({ nombre: req.body.nombre });
    await categoria.save();
    res.status(201).json({ categoria });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar categoría
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true }
    );
    res.json({ categoria });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

module.exports = router;
