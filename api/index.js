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
