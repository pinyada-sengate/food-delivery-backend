import * as jwt from "jsonwebtoken";

import { getEnviromentVariables } from "../environments/environment";

export class Jwt {
  static jwtSign(payload, expiresIn: string = "30d") {
    return jwt.sign(payload, getEnviromentVariables().jwtSecretKey, {
      expiresIn,
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnviromentVariables().jwtSecretKey,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorized"));
          else resolve(decoded);
        }
      );
    });
  }
}
