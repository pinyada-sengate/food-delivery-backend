import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signup() {
    return [
      body("name", "Name is requied").isString(),
      body("phone", "Phone number is requied").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (user) {
              throw new Error("User already exists");
            } else {
              return true;
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 - 20 characters"),
      body("type", "User role is requied").isString(),
      body("status", "User status is requied").isString(),
    ];
  }

  static verifyUserEmailToken() {
    return [
      body("verification_token", "Verification token is required").isNumeric(),
    ];
  }

  static verifyUserForResendEmail() {
    return [query("email", "Email is required").isEmail()];
  }

  static login() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User does not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      query("password", "Password is required").isAlphanumeric(),
    ];
  }

  static checkResetPasswordEmail() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (user) {
              return true;
            } else {
              throw new Error("User does not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
    ];
  }

  static verifyResetPasswordToken() {
    return [
      query("email", "Email is required").isEmail(),
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom(async (resetPasswordToken, { req }) => {
          try {
            const user = await User.findOne({
              email: req.query.email,
              reset_password_token: resetPasswordToken,
              reset_password_token_time: { $gt: Date.now() },
            });

            if (user) {
              return true;
            } else {
              throw new Error("Reset password token does not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });
            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User does not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom(async (resetPasswordToken, { req }) => {
          if (req.user.reset_password_token === resetPasswordToken) {
            return true;
          } else {
            req.errorStatus = 422;
            throw new Error("Invalid reset password token");
          }
        }),
      body("new_password", "New password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 - 20 characters"),
    ];
  }

  static verifyPhoneNumber() {
    return [body("phone", "Phone number is required").isString()];
  }

  static verifyUserProfile() {
    return [
      body("phone", "Phone number is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });
            if (user) {
              throw new Error("A User with entered email already exist.");
            } else {
              return true;
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("password", "Password is required").isAlphanumeric(),
    ];
  }
}
