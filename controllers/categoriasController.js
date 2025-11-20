const Categoria = require('../models/Categoria');

// Listar categorías
async function listarCategorias(req, res) {
  try {
    const categorias = await Categoria.find();
    res.status(200).json({ ok: true, categorias });
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ ok: false, error: 'Error interno al listar categorías' });
  }
}

// Crear categoría
async function crearCategoria(req, res) {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.status(201).json({ ok: true, categoria });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para crear categoría' });
  }
}

// Actualizar categoría
async function actualizarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) {
      return res.status(404).json({ ok: false, error: 'Categoría no encontrada' });
    }
    res.json({ ok: true, categoria });
  } catch (error) {
    console.error(`Error al actualizar categoría ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para actualizar categoría' });
  }
}

// Eliminar categoría
async function eliminarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({ ok: false, error: 'Categoría no encontrada' });
    }
    res.json({ ok: true, mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error(`Error al eliminar categoría ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Error al eliminar categoría' });
  }
}

module.exports = {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
