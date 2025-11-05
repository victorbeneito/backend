const Cliente = require('../models/Cliente');

// Listar clientes
async function listarClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.status(200).json({ ok: true, clientes });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { listarClientes };
