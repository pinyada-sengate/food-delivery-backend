import { validationResult } from "express-validator";

import User from "../models/User";
import { Utils } from "../utils/Utils";

export class UserController {
  static async signup(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    }

    const { email, password, phone, name, type, status } = req.body;
    const verifivationTokenTime = 5 * 60 * 1000; // 5 minute

    let user = new User({
      email,
      verification_token: Utils.generateVerificationToken(),
      verification_token_time: Date.now() + verifivationTokenTime,
      password,
      phone,
      name,
      type,
      status,
    });

    try {
      user = await user.save();
      //TODO: send email to user for verification
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
}
