import express from 'express';
import {allUsers, login, registerUser} from '../controllers/userController';
import {protect} from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(protect, allUsers);
userRouter.post('/login', login);

export default userRouter;
