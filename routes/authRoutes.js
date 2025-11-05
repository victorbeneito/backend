const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const { validarUsuarioRegistro } = require('../middlewares/validaciones');

// Rutas públicas de autenticación
router.post('/registro', validarUsuarioRegistro, registrar);
router.post('/login', login);

module.exports = router;

