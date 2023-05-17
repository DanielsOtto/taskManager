import jwt from 'jsonwebtoken';
import { EXPIRES_IN, TOKEN_SECRET } from '../config/config.js';


export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    TOKEN_SECRET,
    {
      expiresIn: EXPIRES_IN
    });
}

export function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}