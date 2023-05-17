import { ADMIN } from '../config/config.js';

export function checkPermission({ user }, res, next) {
  if (!user) {
    res.status(401).json({ message: 'Not identified' });
  } else {
    if (user.email === ADMIN) {
      next();
    } else {
      res.status(403).json({ message: 'Only admins' });
    }
  }
}