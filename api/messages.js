const connectDB = require('../lib/db');
const Message = require('../models/Message');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: 1 }).lean();
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
