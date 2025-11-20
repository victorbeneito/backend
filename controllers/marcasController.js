const Marca = require('../models/Marca');

// Listar todas las marcas
async function listarMarcas(req, res) {
  try {
    const marcas = await Marca.find().sort({ nombre: 1 });
    res.status(200).json({ ok: true, marcas });
  } catch (error) {
    console.error('Error al listar marcas:', error);
    res.status(500).json({ ok: false, error: 'Error al listar marcas' });
  }
}

// Crear marca
async function crearMarca(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, error: 'El nombre es obligatorio' });
    }
    const existe = await Marca.findOne({ nombre });
    if (existe) {
      return res.status(409).json({ ok: false, error: 'La marca ya existe' });
    }
    const nuevaMarca = new Marca({ nombre });
    await nuevaMarca.save();
    res.status(201).json({ ok: true, marca: nuevaMarca });
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ ok: false, error: 'Error al crear marca' });
  }
}

// Actualizar marca
async function actualizarMarca(req, res) {
  try {
    const { nombre } = req.body;
    const marca = await Marca.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true }
    );
    if (!marca) {
      return res.status(404).json({ ok: false, error: 'Marca no encontrada' });
    }
    res.json({ ok: true, marca });
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({ ok: false, error: 'Error al actualizar marca' });
  }
}

// Eliminar marca
async function eliminarMarca(req, res) {
  try {
    const marca = await Marca.findByIdAndDelete(req.params.id);
    if (!marca) {
      return res.status(404).json({ ok: false, error: 'Marca no encontrada' });
    }
    res.json({ ok: true, mensaje: 'Marca eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({ ok: false, error: 'Error al eliminar marca' });
  }
}

module.exports = {
  listarMarcas,
  crearMarca,
  actualizarMarca,
  eliminarMarca
};
