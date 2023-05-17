import bcrypt from 'bcrypt';
import { HASH_SECRET } from '../config/config.js';
import userList from '../repositories/user.repository/index.js';

export function encryptPassword(password) {
  return bcrypt.hashSync(password, HASH_SECRET);
}

export async function comparePassword(email, password) {
  try {
    const user = await userList.findByEmail(email, false);
    if (!user) {
      return null;
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return null;
    }
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}