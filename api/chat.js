const { Configuration, OpenAIApi } = require('openai');
const connectDB = require('../lib/db');
const Message = require('../models/Message');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    await Message.create({ role: 'user', content: message });

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const botResponse = completion.data.choices[0].message.content.trim();

    await Message.create({ role: 'assistant', content: botResponse });

    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error en /api/chat:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
