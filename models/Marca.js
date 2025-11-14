const mongoose = require('mongoose');

console.log('--- Modelo Marca cargado y registrado ---');

const marcaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  logo_url: String
});

module.exports = mongoose.model('Marca', marcaSchema);
