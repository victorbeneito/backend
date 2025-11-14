const express = require('express');
const router = express.Router();

const { crearPedido, listarPedidos, obtenerPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedidosController');
const autenticarToken = require('../middlewares/authMiddleware');

// Todas las rutas protegidas con autenticación JWT
router.use(autenticarToken);

router.post('/', crearPedido);
router.get('/', listarPedidos);
router.get('/:id', obtenerPedido);
router.put('/:id', actualizarPedido);
router.delete('/:id', eliminarPedido);

module.exports = router;
