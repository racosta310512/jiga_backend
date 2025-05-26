/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes'); // ✅ LÍNEA AÑADIDA

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // ✅ LÍNEA AÑADIDA

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB Atlas 🚀');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error);
});

module.exports = app;*/


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB Atlas 🚀');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error);
});

// ✅ Exportación compatible con Vercel Serverless Function
module.exports = (req, res) => {
  app(req, res);
};
