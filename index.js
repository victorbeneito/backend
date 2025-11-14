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
app.use((req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.url}, Body:`, req.body);
  next();
});

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

// Mostrar todas las rutas registradas para debugging
if (app._router) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Rutas registradas directamente en app
      console.log('Ruta:', middleware.route.path);
    } else if (middleware.name === 'router') {
      // Rutas registradas en routers
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log('Ruta:', handler.route.path);
        }
      });
    }
  });
} else {
  console.log('No hay rutas registradas aún.');
}

console.log('app._router:', app._router);
// Mostrar todas las rutas registradas para debugging
if (app._router) {
  console.log('RUTAS REGISTRADAS:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`-> ${Object.keys(middleware.route.methods).join(', ')} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(`-> ${Object.keys(handler.route.methods).join(', ')} ${handler.route.path}`);
        }
      });
    }
  });
} else {
  console.log('No hay rutas registradas aún.');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
