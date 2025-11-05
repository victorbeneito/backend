const mongoose = require('mongoose');

const varianteSchema = new mongoose.Schema({
  color: String,
  tamaño: String,
  precio_extra: Number
});

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  stock: Number,
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca' },
  categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }],
  variantes: [varianteSchema],
  imagenes: [String],
  descripcion: [String],
  destacado: Boolean
});

module.exports = mongoose.model('Producto', productoSchema);
