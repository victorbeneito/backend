const express = require('express');
const router = express.Router();

const { listarClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clientesController');
const autenticarToken = require('../middlewares/authMiddleware');
// Si tienes validaciones específicas, impórtalas aquí (ejemplo: validarCliente)

router.use(autenticarToken); // Todas protegidas

router.get('/', listarClientes);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;
