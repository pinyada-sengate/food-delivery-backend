import * as Bcrypt from "bcrypt";
import User from "../models/User";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";

export class UserController {
  private static encryptPassword(req, res, next) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static async signup(req, res, next) {
    const { email, phone, name, type, status } = req.body;

    try {
      const hash = await UserController.encryptPassword(req, res, next);

      let user = new User({
        email,
        verification_token: Utils.generateVerificationToken(),
        verification_token_time: Date.now() + Utils.MAX_TOKEN_TIME,
        password: hash,
        phone,
        name,
        type,
        status,
      });

      user = await user.save();
      await NodeMailer.sendMail({
        to: [user.email],
        subject: "Email verification",
        html: `<h1>OTP: ${user.verification_token}</h1>`,
      });
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

  static async resendVerificationEmail(req, res, next) {
    const { email } = req.body;
    const verificationToken = Utils.generateVerificationToken();

    try {
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          verification_token: verificationToken,
          verification_token_time: Date.now() + Utils.MAX_TOKEN_TIME,
        },
        { new: true }
      );

      if (user) {
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Resend email verification",
          html: `<h1>OTP: ${user.verification_token}</h1>`,
        });
        res.json({ success: true });
      } else {
        throw new Error("User does not exist.");
      }
    } catch (e) {
      next(e);
    }
  }
}
