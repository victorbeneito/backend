const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');

// Rutas públicas para registro y login
router.post('/registro', registrar);
router.post('/login', login);

module.exports = router;
