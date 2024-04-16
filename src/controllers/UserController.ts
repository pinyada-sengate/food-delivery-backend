import User from "../models/User";

export class UserController {
  static login(req, res, next) {
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
