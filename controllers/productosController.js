const Producto = require('../models/Producto'); // Ajusta ruta según tu estructura

// async function listarProductos(req, res) {
//   try {
//     const productos = await Producto.find()
//       .populate('marca', 'nombre descripcion logo_url')
//       .populate('categoria', 'nombre');
//     res.json({ ok: true, productos });
//   } catch (error) {
//     console.error('Error al obtener productos:', error);
//     res.status(500).json({ ok: false, error: 'Error interno al obtener productos' });
//   }
// }

async function listarProductos(req, res) {
  try {
    const q = req.query.q || ""; // Parámetro búsqueda
        let productos;

    if (q.trim() === "") {
      // Si no hay texto en búsqueda, devuelve todos los productos
            productos = await Producto.find()
        .populate('marca', 'nombre descripcion logo_url')
        .populate('categoria', 'nombre');
    } else {
      // Escapar caracteres especiales para evitar mal funcionamiento en regex
      const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Busca productos cuyo nombre contenga el texto (regex insensible a mayúsculas)
            const regex = new RegExp(escapedQuery, "i");
            productos = await Producto.find({ nombre: regex })
        .populate('marca', 'nombre descripcion logo_url')
        .populate('categoria', 'nombre');
    }
    res.json({ ok: true, productos });

  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener productos' });
  }
}


async function obtenerProducto(req, res) {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate('marca', 'nombre descripcion logo_url')
      .populate('categoria', 'nombre');
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.json({ ok: true, producto });
  } catch (error) {
    console.error(`Error al obtener producto ${req.params.id}:`, error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener producto' });
  }
}

async function crearProducto(req, res) {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({ ok: true, producto });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para crear producto' });
  }
}

async function actualizarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('marca', 'nombre descripcion logo_url')
      .populate('categoria', 'nombre');
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.json({ ok: true, producto });
  } catch (error) {
    console.error(`Error al actualizar producto ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para actualizar producto' });
  }
}

async function eliminarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    res.json({ ok: true, mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar producto ${req.params.id}:`, error);
    res.status(500).json({ ok: false, error: 'Error interno al eliminar producto' });
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};