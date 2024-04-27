import { validationResult } from "express-validator";
import { Jwt } from "../utils/Jwt";

export class GlobalMiddleware {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    const headerAuth = req.headers.authorization;
    const token = headerAuth ? headerAuth.slice(7, headerAuth.lenhth) : null;
    try {
      if (!token) {
        req.errorStatus = 401;
        next(new Error("User does not exist"));
      }

      const decoded = await Jwt.jwtVerify(token);
      req.user = decoded;
      next();
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }

  static adminRole(req, res, next) {
    const user = req.user;

    if (user.type === "admin") {
      req.errorStatus = 401;
      next(new Error("Unauthorize user"));
    }
    next();
  }
}
