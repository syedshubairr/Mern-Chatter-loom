import mongoose from 'mongoose';

const MessageModel = new mongoose.Schema(
  {
    sender: {type: mongoose.Schema.Types.ObjectId},
    content: {type: String, trim: true},
    chat: {type: mongoose.Schema.Types.ObjectId},
  },
  {
    timestamps: true,
  },
);
export const Message = mongoose.model('Message', MessageModel);
