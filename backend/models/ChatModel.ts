import mongoose from 'mongoose';

const ChatModel = new mongoose.Schema(
  {
    chatName: {type: 'String', trim: true},
    isGroupChat: {type: 'boolean', default: true},
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Chat = mongoose.model('Chat', ChatModel);
