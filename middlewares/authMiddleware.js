import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('Token no proporcionado');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Devuelve el payload (ej. userId, email)
  } catch (err) {
    throw new Error('Token inválido');
  }
}
