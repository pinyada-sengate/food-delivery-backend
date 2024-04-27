import { Router } from "express";

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

  getRoutes() {}

  postRoutes() {}

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new BannerRouter().router;
