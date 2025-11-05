const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');

const autenticarToken = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API backend funcionando correctamente');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas públicas (registro y login)
app.use('/auth', authRoutes);

// Rutas protegidas (requieren autenticación JWT)
// app.use('/productos', autenticarToken, productosRoutes);
app.use('/productos', productosRoutes)
app.use('/pedidos', autenticarToken, pedidosRoutes);
app.use('/clientes', autenticarToken, clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
