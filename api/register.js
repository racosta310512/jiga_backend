import { connectToDatabase } from '../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Este email já está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection('users').insertOne(newUser);

    // Crear token para el usuario
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario creado con éxito', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
}
