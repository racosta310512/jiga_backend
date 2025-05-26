import { connectToDatabase } from '../../lib/db';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    return product
      ? res.status(200).json(product)
      : res.status(404).json({ message: 'Producto no encontrado' });
  }

  if (req.method === 'PUT') {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Método no permitido' });
}
