import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/send/verification/email",
      GlobalMiddleware.auth,
      UserController.resendVerificationEmail
    );

    this.router.get(
      "/login",
      UserValidators.login(),
      GlobalMiddleware.checkError,
      UserController.login
    );

    this.router.get(
      "/send/reset/password/token",
      UserValidators.checkResetPasswordEmail(),
      GlobalMiddleware.checkError,
      UserController.sendResetPasswordOtp
    );

    this.router.get(
      "/verify/resetPasswordToken",
      UserValidators.verifyResetPasswordToken(),
      GlobalMiddleware.checkError,
      UserController.verifyResetPasswordToken
    );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.signup(),
      GlobalMiddleware.checkError,
      UserController.signup
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify/emailToken",
      UserValidators.verifyUserEmailToken(),
      GlobalMiddleware.auth,
      UserController.verifyUserEmailToken
    );

    this.router.patch(
      "/reset/password",
      UserValidators.resetPassword(),
      GlobalMiddleware.checkError,
      UserController.resetPassword
    );
  }

  putRoutes() {}

  deleteRoutes() {}
}

export default new UserRouter().router;
