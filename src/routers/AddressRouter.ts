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
    this.router.get(
      "/getLimitedAddresses",
      GlobalMiddleware.auth,
      AddressValidators.getLimitedAddresses(),
      GlobalMiddleware.checkError,
      AddressController.getLimitedAddresses
    );
    this.router.get(
      "/checkAddress",
      GlobalMiddleware.auth,
      AddressValidators.checkAddress(),
      GlobalMiddleware.checkError,
      AddressController.checkAddress
    );
    this.router.get(
      "/:id",
      GlobalMiddleware.auth,
      AddressController.getAddressesById
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

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      GlobalMiddleware.auth,
      AddressValidators.editAddress(),
      GlobalMiddleware.checkError,
      AddressController.editAddress
    );
  }

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
