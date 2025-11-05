const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function registrar(req, res) {
  try {
    const { email, password } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ ok: false, error: 'Usuario ya registrado' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ email, password: hashed });
    await usuario.save();
    res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
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
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { registrar, login };
