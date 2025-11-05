const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  sitio_web: String,
  logo_url: String
});

module.exports = mongoose.model('Marca', marcaSchema);
