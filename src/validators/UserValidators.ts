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

  static verifyEmail() {
    return [
      body("email", "Email is required").isEmail(),
      body(
        "verification_token",
        "Email verification token is required"
      ).isNumeric(),
    ];
  }

  static verifyUserForResendEmail() {
    return [query("email", "Email is required").isEmail()];
  }

  static login() {
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
      body("password", "Password is required").isAlphanumeric(),
    ];
  }
}
