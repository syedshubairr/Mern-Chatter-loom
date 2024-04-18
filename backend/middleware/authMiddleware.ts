import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import {User} from '../models/UserModal';

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]; // spit the token.
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET,
        ) as jwt.JwtPayload; // decoding the token with your jwt_secret.
        console.log('Decoded token: ', decoded);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(404);
        throw new Error('No Authorization token failed');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('No Authorization, no token');
    }
  },
);
