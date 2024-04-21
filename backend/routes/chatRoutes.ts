import express from 'express';
import {protect} from '../middleware/authMiddleware';
import {accessChat, fetchChats} from '../controllers/chatController';

const chatRouter = express.Router();

chatRouter.route('/').post(protect, accessChat);
chatRouter.route('/').get(protect, fetchChats);
// chatRouter.route("/group").post(protect, createGroupChat);
// chatRouter.route('/groupRename').put(protect, renameGroup);
// chatRouter.route('/groupRemove').put(protect, removeFromGroup);
// chatRouter.route('/groupAdd').put(protect, addToGroup);

export default chatRouter;
