const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function registrar(req, res) {
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
}

async function login(req, res) {
  try {
    console.log('Petición de login recibida con body:', req.body);
    const { email, password } = req.body;

    console.log('Email recibido:', email);
    console.log('Password recibido:', password);

    const emailNormalized = email.trim().toLowerCase();
    console.log('Email normalizado para búsqueda:', emailNormalized);

    const usuario = await Usuario.findOne({ email: emailNormalized });

    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
    }

    console.log('Hash de contraseña en DB:', usuario.password);

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      console.log('Contraseña incorrecta');
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
}

module.exports = { registrar, login };
