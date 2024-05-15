import { Router } from "express";

class CategoryRouter {
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

export default new CategoryRouter().router;
