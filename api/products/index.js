import { connectToDatabase } from '../../lib/db';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const products = await Product.find({});
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, description, price, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    const newProduct = new Product({ name, description, price, category, image });
    await newProduct.save();
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ message: 'Método no permitido' });
}
