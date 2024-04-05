import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {User} from '../models/UserModal';
import {GenerateToken} from '../config/tokenGenerate';
import {registerUserPasswordValidation} from '../validations/userValidations';

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const {name, email, password, confirmPassword, pic} = req.body;
    if (!registerUserPasswordValidation(password, confirmPassword)) {
      res
        .status(400)
        .json({error: 'Password and confirm password doesnt match'});
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      res
        .status(400)
        .json({error: 'Username, email and Password are required'});
      return;
    }
    const userExist = await User.findOne({email});
    if (userExist) {
      res.status(400).json({error: 'User already exists'});
      return;
    }
    const newUser = await User.create({name, email, password, pic});
    if (newUser) {
      res.status(201).json({
        message: 'User created successfully',
        data: {_id: newUser._id, name: newUser.name, email: newUser.email},
      });
      return;
    } else {
      res.status(400).json({error: 'Unable to create user'});
      return;
    }
  },
);
export const login = asyncHandler(async (req: Request, res: Response) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).json({error: 'Username or Password cannot be empty'});
    return;
  }
  const user = await User.findOne({email: email});
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
      pic: user.pic,
      token: GenerateToken(user._id),
    });
  } else {
    res.status(401).json({error: 'Invalid username or password'});
    throw new Error('Invalid Email or Password');
  }
});
