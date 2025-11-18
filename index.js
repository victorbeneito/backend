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

// Requiere modelos para inicializar esquemas (opcional)
require('./models/Marca');
require('./models/Producto');
require('./models/Categoria');
require('./models/Pedido');
require('./models/Cliente');
require('./models/Usuario');

// Rutas públicas (registro y login)
app.use('/auth', authRoutes);

// Sirve archivos estáticos de uploads
app.use('/uploads', express.static('uploads'));

// Rutas sin autenticación para productos públicos
app.use('/productos', productosRoutes);

// Rutas protegidas con JWT
app.use('/pedidos', autenticarToken, pedidosRoutes);
app.use('/clientes', autenticarToken, clientesRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/marcas', marcasRoutes);

// Rutas para subir archivos
app.use('/api', uploadRoutes);

// Ruta raíz simple
app.get('/', (req, res) => {
  res.send('API backend funcionando correctamente');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
