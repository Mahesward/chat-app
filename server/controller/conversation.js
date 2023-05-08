import { CONVERSATION } from '../models/index.js';

//* message controller

export const newConversation = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;

    const newConvs = await new CONVERSATION({ members: [recieverId, senderId] });
    await newConvs.save();

    return res.status(500).send({ success: true, message: 'Conversation Created Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: true, message: 'Internal Server Error' });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await CONVERSATION.find({
      members: { $in: [id] },
    });

    console.log(conversation);
    return res.status(200).send({ success: true, message: 'get conversation successfull', conversation });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
