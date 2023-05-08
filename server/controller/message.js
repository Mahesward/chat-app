import { MESSAGE } from '../models/index.js';

export const newMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMsg = new MESSAGE({ conversationId, sender, text });
    await newMsg.save();
    return res.status(200).send({ success: true, message: 'New Message Successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await MESSAGE.find({ conversationId: id });
    return res.status(200).send({ success: true, message: 'Get Message Successful', messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
