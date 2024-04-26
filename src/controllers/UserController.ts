import User from "../models/User";
import { Jwt } from "../utils/Jwt";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import { query } from "express-validator";

export class UserController {
  static async signup(req, res, next) {
    const { email, phone, name, type, status, password } = req.body;

    try {
      const hash = await Utils.encryptPassword(password);

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
      const payload = {
        user_id: user._id,
        email: user.email,
      };
      const token = Jwt.jwtSign(payload);

      res.json({
        token,
        user,
      });

      await NodeMailer.sendMail({
        to: [user.email],
        subject: "Email verification",
        html: `<h1>OTP: ${user.verification_token}</h1>`,
      });
    } catch (e) {
      next(e);
    }
  }

  static async verifyUserEmailToken(req, res, next) {
    const { verification_token } = req.body;
    const { email } = req.user;

    try {
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
          updated_at: new Date(),
        },
        {
          email_verification: true,
        },
        { new: true }
      );

      if (user) {
        res.send(user);
      } else {
        throw new Error("Invalid OTP or Email verification is expired.");
      }
    } catch (e) {
      next(e);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    const { email } = req.user;
    const verificationToken = Utils.generateVerificationToken();

    try {
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          verification_token: verificationToken,
          verification_token_time: Date.now() + Utils.MAX_TOKEN_TIME,
          updated_at: new Date(),
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

  static async login(req, res, next) {
    const { password } = req.query;
    const user = req.user;
    const data = {
      password,
      encryptPassword: user.password,
    };

    try {
      await Utils.comparePassword(data);
      const payload = {
        user_id: user._id,
        email: user.email,
      };
      const token = Jwt.jwtSign(payload);

      res.json({
        token,
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async sendResetPasswordOtp(req, res, next) {
    const { email } = req.query;
    const resetPasswordToken = Utils.generateVerificationToken();

    try {
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          reset_password_token: resetPasswordToken,
          reset_password_token_time: Date.now() + Utils.MAX_TOKEN_TIME,
          updated_at: new Date(),
        },
        { new: true }
      );

      if (user) {
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Reset password verification",
          html: `<h1>OTP: ${user.reset_password_token}</h1>`,
        });
        res.json({ success: true });
      } else {
        throw new Error("User does not exist.");
      }
    } catch (e) {
      next(e);
    }
  }

  static async verifyResetPasswordToken(req, res, next) {
    try {
      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  static async resetPassword(req, res, next) {
    const user = req.user;
    const newPassword = req.body.new_password;

    try {
      const encryptPassword = await Utils.encryptPassword(newPassword);
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          password: encryptPassword,
          updated_at: new Date(),
        },
        { new: true }
      );

      if (updatedUser) {
        res.send(updatedUser);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (e) {
      next(e);
    }
  }
}
