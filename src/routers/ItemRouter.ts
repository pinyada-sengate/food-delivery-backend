import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { ItemController } from "../controllers/ItemController";
import { ItemValidators } from "../validators/ItemValidators";

class ItemRouter {
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
      "/items",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      ItemController.getItems
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      ItemValidators.addItem(),
      GlobalMiddleware.checkError,
      ItemController.addItem
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new ItemRouter().router;
