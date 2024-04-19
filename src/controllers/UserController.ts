import User from "../models/User";
import { Utils } from "../utils/Utils";

export class UserController {
  static async signup(req, res, next) {
    const { email, password, phone, name, type, status } = req.body;

    let user = new User({
      email,
      verification_token: Utils.generateVerificationToken(),
      verification_token_time: Date.now() + Utils.MAX_TOKEN_TIME,
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

  static async verify(req, res, next) {
    const { email, verification_token } = req.body;

    try {
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verification: true,
        },
        { new: true }
      );

      if (user) {
        res.send(user);
      } else {
        throw new Error("Email verification is expired.");
      }
    } catch (e) {
      next(e);
    }
  }
}
