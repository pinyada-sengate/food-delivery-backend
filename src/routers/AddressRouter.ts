import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleWare";
import { AddressController } from "../controllers/AddressController";
import { AddressValidators } from "../validators/AddressValidators";

class AddressRouter {
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
      "/addresses",
      GlobalMiddleware.auth,
      AddressController.getAddresses
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      AddressValidators.addAddress(),
      GlobalMiddleware.checkError,
      AddressController.addAddress
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.auth,
      AddressController.deleteAddress
    );
  }
}

export default new AddressRouter().router;
