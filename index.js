const express = require('express');
const { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('./controllers/productosController');
const { crearPedido, listarPedidos, obtenerPedido } = require('./controllers/pedidosController');
const { listarClientes } = require('./controllers/clientesController');
const { registrar, login } = require('./controllers/authController');
const autenticarToken = require('./middlewares/authMiddleware');
const { validarProducto } = require('./middlewares/validaciones'); // Asumiendo que lo tienes
const { crearProducto, listarProductos } = require('./controllers/productosController');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Productos
app.post('/productos', crearProducto);
app.get('/productos', listarProductos);
app.get('/productos/:id', obtenerProducto);
app.put('/productos/:id', actualizarProducto);
app.delete('/productos/:id', eliminarProducto);

// Pedidos
app.post('/pedidos', crearPedido);
app.get('/pedidos', listarPedidos);
app.get('/pedidos/:id', obtenerPedido);

// Clientes
app.get('/clientes', listarClientes);

// Rutas públicas (registro, login)
app.post('/auth/registro', registrar);
app.post('/auth/login', login);

// Rutas protegidas
app.post('/productos', autenticarToken, validarProducto, crearProducto);
app.get('/productos', autenticarToken, listarProductos);
// Otras rutas protegidas aquí...

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
