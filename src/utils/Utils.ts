import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";

import { getEnviromentVariables } from "../environments/environment";

export class Utils {
  public static readonly MAX_TOKEN_TIME = 5 * 60 * 1000; // 5 minute

  static generateVerificationToken(digit: number = 6): string {
    const max = 10;
    let otp = "";

    for (let i = 0; i < digit; i++) {
      const ran = Math.floor(Math.random() * max);
      otp += ran;
    }

    return otp;
  }

  static encryptPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(data: { password: string; encryptPassword: string }) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.hash(data.password, data.encryptPassword, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("User and password does not match"));
        } else {
          resolve(same);
        }
      });
    });
  }

  static jwtSign(payload, expiresIn: string = "30d") {
    return Jwt.sign(payload, getEnviromentVariables().jwtSecretKey, {
      expiresIn,
    });
  }
}
