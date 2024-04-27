import { Router } from "express";

import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { BannerValidators } from "../validators/BannerValidators";
import { BannerController } from "../controllers/BannerController";
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
      "/banners",
      GlobalMiddleware.auth,
      BannerController.getBanner
    );
  }

  postRoutes() {
    this.router.post(
      "/add/banner",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole,
      new Utils().multer.single("banner"),
      BannerValidators.addBanner(),
      GlobalMiddleware.checkError,
      BannerController.addBanner
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new BannerRouter().router;
