import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { ItemController } from "../controllers/ItemController";
import { ItemValidators } from "../validators/ItemValidators";
import { Utils } from "../utils/Utils";

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
    this.router.get("/items", GlobalMiddleware.auth, ItemController.getItems);
    this.router.get(
      "/items/:restaurantId",
      GlobalMiddleware.auth,
      ItemValidators.getItemsByRestaurantId(),
      GlobalMiddleware.checkError,
      ItemController.getItemsByRestaurantId
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      new Utils().multer.single("itemImages"),
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
