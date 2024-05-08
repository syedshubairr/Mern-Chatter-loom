import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {Chat} from '../models/ChatModel';
import {User} from '../models/UserModal';

export const accessChat = asyncHandler(async (req: Request, res: Response) => {
  console.log('accessChat API HIT');
  const {userId} = req.body;
  if (!userId) {
    res.status(400).json({message: 'Unable to find chat'});
    return;
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
    return;
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
export const createGroupChat = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.users || !req.body.name) {
      res.status(400).json({message: 'Please Fill all the fields.'});
      return;
    }
    const users = JSON.parse(req.body.users);
    if (users.length < 2) {
      res
        .status(200)
        .json({message: 'More than 2 users required to form a group chat'});
    }
    users.push(req.user);
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });
      const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  },
);
export const renameGroup = asyncHandler(async (req: Request, res: Response) => {
  const {groupId, groupName} = req.body;
  const updatedGroup = await Chat.findByIdAndUpdate(
    groupId,
    {
      chatName: groupName,
    },
    {new: true},
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!updatedGroup) {
    res.status(400);
    throw new Error('Chat not Found');
  } else {
    res.status(200).json(updatedGroup);
  }
});
export const addToGroup = asyncHandler(async (req: Request, res: Response) => {
  const {chatId, userId} = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {users: userId},
    },
    {
      new: true,
    },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!added) {
    res.status(400);
    throw new Error('Chat not Found');
  } else {
    res.status(200).json(added);
  }
});
export const removeFromGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const {chatId, userId} = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {users: userId},
      },
      {
        new: true,
      },
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    if (!removed) {
      res.status(400);
      throw new Error('Chat not Found');
    } else {
      res.status(200).json(removed);
    }
  },
);
