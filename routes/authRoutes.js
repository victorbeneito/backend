const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { validarUsuarioRegistro } = require('../middlewares/validaciones');

// Registro de usuario
router.post('/registro', validarUsuarioRegistro, async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.trim().toLowerCase();

    const existe = await Usuario.findOne({ email: emailNormalized });
    if (existe) {
      return res.status(400).json({ ok: false, error: 'Usuario ya registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ email: emailNormalized, password: hashed });
    await usuario.save();

    res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.trim().toLowerCase();

    const usuario = await Usuario.findOne({ email: emailNormalized });
    if (!usuario) {
      return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ ok: false, error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.SECRETO_JWT,
      { expiresIn: '1h' }
    );

    res.json({ ok: true, token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
});

console.log('authRoutes cargado');

module.exports = router;

