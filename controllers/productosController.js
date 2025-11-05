const Producto = require('../models/Producto');

// Crear producto
async function crearProducto(req, res) {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({ ok: true, producto });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Obtener todos los productos
async function listarProductos(req, res) {
  try {
    const productos = await Producto.find()
      .populate('marca')
      .populate('categorias');
    res.status(200).json({ ok: true, productos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Obtener producto por id
async function obtenerProducto(req, res) {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate('marca')
      .populate('categorias');
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.status(200).json({ ok: true, producto });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Actualizar producto
async function actualizarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.status(200).json({ ok: true, producto });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Eliminar producto
async function eliminarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.status(200).json({ ok: true, mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto };
