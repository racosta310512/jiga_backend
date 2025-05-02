const axios = require('axios');
const connectDB = require('../lib/db');
const Message = require('../models/Message');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje vacío' });
  }

  try {
    await connectDB();

    // Guarda mensaje del usuario en MongoDB
    await Message.create({ role: 'user', content: message });

    // Llama a OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // O puedes probar mistralai/mixtral-8x7b, anthropic/claude-3-opus, etc.
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://jiga-ecru.vercel.app/', // Cambia por tu dominio
          'X-Title': 'Jiga Asistente',
        },
      }
    );

    const botResponse = response.data.choices[0].message.content.trim();

    // Guarda respuesta del bot en MongoDB
    await Message.create({ role: 'assistant', content: botResponse });

    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error en /api/chat:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
