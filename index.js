const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const autenticarToken = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(cors());

// Opcional: inicializar esquemas (generalmente no obligatorio, Mongoose lo hace al import)
require('./models/Marca');
require('./models/Producto');
require('./models/Categoria');
require('./models/Pedido');
require('./models/Cliente');
require('./models/Usuario');

// Rutas de autenticación públicas
app.use('/auth', authRoutes);

// Archivos estáticos uploads
app.use('/uploads', express.static('uploads'));

// Rutas públicas para productos
app.use('/productos', productosRoutes);

// Rutas protegidas con autenticarToken middleware
app.use('/pedidos', autenticarToken, pedidosRoutes);
app.use('/clientes', autenticarToken, clientesRoutes);

// Categorias y marcas (puedes añadir autenticación si quieres)
app.use('/categorias', categoriasRoutes);
app.use('/marcas', marcasRoutes);

// Rutas para subir archivos
app.use('/api', uploadRoutes);

// Ruta raíz simple
app.get('/', (req, res) => {
  res.send('API backend funcionando correctamente');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
