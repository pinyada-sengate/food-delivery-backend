import { validationResult } from "express-validator";

import User from "../models/User";

export class UserController {
  static signup(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    }

    const { name, email, password, type, status, phone } = req.body;

    const user = new User({
      email,
      password,
      name,
      type,
      status,
      phone,
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
