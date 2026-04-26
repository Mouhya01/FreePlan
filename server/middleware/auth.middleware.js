import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import asyncWrapper from '../utils/asyncWrapper.js';

export const verifyToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Access denied. No token provided.');
    err.statusCode = 401;
    return next(err);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select('-password');

  if (!req.user) {
    const err = new Error('User no longer exists.');
    err.statusCode = 401;
    return next(err);
  }

  next();
});