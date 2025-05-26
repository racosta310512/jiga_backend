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


// backend/index.js o api/index.js (dependiendo de tu estructura en Vercel)
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

// 💡 Aquí agregas la ruta de la imagen
app.get('/', (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJS y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto back end en Vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

// Conexión a MongoDB Atlas
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

// ✅ Exportación compatible con Vercel
module.exports = (req, res) => {
  app(req, res);
};
