import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { RestaurantValidators } from "../validators/RestaurantValidators";
import { RestaurantController } from "../controllers/RestaurantController";
import { Utils } from "../utils/Utils";

class BannerRouter {
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
      "/restaurants",
      GlobalMiddleware.auth,
      RestaurantController.getRestaurants
    );

    this.router.get(
      "/nearbyRestaurants",
      GlobalMiddleware.auth,
      RestaurantValidators.nearbyRestaurants(),
      GlobalMiddleware.checkError,
      RestaurantController.getNearbyRestaurants
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      new Utils().multer.single("restaurantImage"),
      RestaurantValidators.addRestaurant(),
      GlobalMiddleware.checkError,
      RestaurantController.addRestaurant
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new BannerRouter().router;
