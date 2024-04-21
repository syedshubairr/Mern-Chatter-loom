import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {Chat} from '../models/ChatModel';
import {User} from '../models/UserModal';

export const accessChat = asyncHandler(async (req: Request, res: Response) => {
  console.log('accessChat API HIT');
  const {userId} = req.body;
  if (!userId) {
    res.status(400).json({message: 'Unable to find chat'});
  }
  let isChat: any = await Chat.find({
    isGroupChat: false,
    $and: [
      {users: {$elemMatch: {$eq: userId}}},
      {users: {$elemMatch: {$eq: req.user._id}}},
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');
  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });
  if (isChat.length > 0) {
    res.status(200).json(isChat);
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.find({_id: createdChat.id}).populate(
        'users',
        '-password',
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
export const fetchChats = asyncHandler(async (req: Request, res: Response) => {
  console.log('Fetch-Chats Api Hit');
  try {
    Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({updatedAt: -1})
      .then(async (results: any) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name pic email',
        });
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
