import { body } from "express-validator";

export class UserValidators {
  static signup() {
    return [
      body("name", "Name is requied").isString(),
      body("phone", "Phone number is requied").isString(),
      body("email", "Email is required").isEmail(),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 - 20 characters"),
      body("type", "User role is requied").isString(),
      body("status", "User status is requied").isString(),
    ];
  }
}
