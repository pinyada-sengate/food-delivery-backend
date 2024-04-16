import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";

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

  getRoutes() {}

  postRoutes() {
    this.router.post("/login", UserValidators.signup(), UserController.login);
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new UserRouter().router;
