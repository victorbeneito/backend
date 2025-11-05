const Pedido = require('../models/Pedido');

// Crear pedido
async function crearPedido(req, res) {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json({ ok: true, pedido });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Obtener todos los pedidos
async function listarPedidos(req, res) {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente_id')
      .populate('productos.producto_id');
    res.status(200).json({ ok: true, pedidos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Obtener pedido por id
async function obtenerPedido(req, res) {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente_id')
      .populate('productos.producto_id');
    if (!pedido) return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    res.status(200).json({ ok: true, pedido });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { crearPedido, listarPedidos, obtenerPedido };
