import redisClient from "../utils/redis";

import dbCli from "../utils/db";


class UsersController {
  static postUsers(req, res) {
    const email = '';
    const password = '';
    if (!email) {
      res.status(400);
      new Error('Missing email');
    }
    if (!password) {
        res.status(400);
        new Error('Missing password');
    }
  }
}

export default UsersController;
