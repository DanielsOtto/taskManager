import userService from '../../services/user.services/index.js'

export class UserController {

  async userInfo({ user }, res, next) {
    try {
      const users = await userService.getInfo(user);
      res.status(200).json({ info: users });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }



}