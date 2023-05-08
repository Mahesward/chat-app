import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

const conversationModel = mongoose.model('Conversation', conversationSchema);
export default conversationModel;
