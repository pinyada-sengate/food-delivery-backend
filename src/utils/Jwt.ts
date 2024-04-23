import * as jwt from "jsonwebtoken";

import { getEnviromentVariables } from "../environments/environment";

export class Jwt {
  static jwtSign(payload, expiresIn: string = "30d") {
    return jwt.sign(payload, getEnviromentVariables().jwtSecretKey, {
      expiresIn,
    });
  }
}
