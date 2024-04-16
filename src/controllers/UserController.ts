import { validationResult } from "express-validator";

import User from "../models/User";

export class UserController {
  static login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => e.msg),
      });
    }
    const { email, password } = req.body;

    const user = new User({
      email,
      password,
    });

    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        next(error);
      });
  }
}
