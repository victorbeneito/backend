const express = require('express');
const router = express.Router();
const { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productosController');
const { validarProducto } = require('../middlewares/validaciones');

router.post('/', validarProducto, crearProducto);
router.get('/', listarProductos);
router.get('/:id', obtenerProducto);
router.put('/:id', validarProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
