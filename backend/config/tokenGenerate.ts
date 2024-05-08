import * as jwt from 'jsonwebtoken';

export const GenerateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
