const express = require('express');
const router = express.Router();
const { listarClientes } = require('../controllers/clientesController');

router.get('/', listarClientes);

module.exports = router;
