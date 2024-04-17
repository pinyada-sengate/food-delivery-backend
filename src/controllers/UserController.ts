import { validationResult } from "express-validator";

import User from "../models/User";

export class UserController {
  static async signup(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    }

    const { name, email, password, type, status, phone } = req.body;

    let user = new User({
      email,
      password,
      name,
      type,
      status,
      phone,
    });

    try {
      user = await user.save();
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
}
