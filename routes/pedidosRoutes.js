const express = require('express');
const router = express.Router();
const { crearPedido, listarPedidos, obtenerPedido } = require('../controllers/pedidosController');

router.post('/', crearPedido);
router.get('/', listarPedidos);
router.get('/:id', obtenerPedido);

module.exports = router;
