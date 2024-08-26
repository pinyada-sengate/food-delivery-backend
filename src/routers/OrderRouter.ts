import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { OrderController } from "../controllers/OrderController";
import { OrderValidators } from "../validators/OrderValidators";

class OrderRouter {
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
      "/userOrders",
      GlobalMiddleware.auth,
      OrderController.getUserOrders
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleware.auth,
      OrderValidators.placeOrder(),
      GlobalMiddleware.checkError,
      OrderController.placeOrder
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new OrderRouter().router;
