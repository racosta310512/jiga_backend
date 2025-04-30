import { verifyToken } from '../middleware/authMiddleware';
import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const decodedUser = verifyToken(req);
    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(decodedUser.userId) });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Perfil cargado correctamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        // Puedes agregar más campos si los guardas (avatar, bio, etc.)
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message || 'Token inválido' });
  }
}

