const express = require('express');
const router = express.Router();

const { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productosController');
const { validarProducto } = require('../middlewares/validaciones');
const autenticarToken = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', listarProductos);
router.get('/:id', obtenerProducto);

// Middleware para proteger las rutas que modifican datos
router.use(autenticarToken);

router.post('/', validarProducto, crearProducto);
router.put('/:id', validarProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;