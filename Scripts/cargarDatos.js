const mongoose = require('mongoose');
require('dotenv').config();

const Categoria = require('../models/Categoria');
const Marca = require('../models/Marca');

const categoriasData = require('../data/categorias.json');
const marcasData = require('../data/marcas.json');

async function cargarDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Categoria.deleteMany();  // Borra categorías existentes (opcional)
    await Marca.deleteMany();      // Borra marcas existentes (opcional)

    await Categoria.insertMany(categoriasData);
    console.log('Categorías cargadas');

    await Marca.insertMany(marcasData);
    console.log('Marcas cargadas');

    await mongoose.disconnect();
    console.log('Conexión cerrada');
  } catch(error) {
    console.error('Error cargando datos:', error);
    process.exit(1);
  }
}

cargarDatos();