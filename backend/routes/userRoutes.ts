import express from 'express';
import {login, registerUser} from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/').post(registerUser);
userRouter.post('/login', login);

export default userRouter;
