const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Product.deleteMany();

  const products = [
    {
      name: 'Camiseta Negra',
      description: 'Camiseta de algodón de alta calidad',
      price: 19.99,
      category: 'Ropa',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Auriculares Bluetooth',
      description: 'Con cancelación de ruido',
      price: 49.99,
      category: 'Tecnología',
      image: 'https://via.placeholder.com/150'
    }
  ];

  await Product.insertMany(products);
  console.log('Productos insertados');
  mongoose.disconnect();
};

seed();
