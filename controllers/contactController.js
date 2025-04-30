import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, msg: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Erro ao enviar mensagem." });
  }
};
