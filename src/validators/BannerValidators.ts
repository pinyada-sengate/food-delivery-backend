import { body } from "express-validator";

export class BannerValidators {
  static addBanner() {
    return [
      body("bannerImages", "Banner is required").custom((banner, { req }) => {
        if (req.file) {
          //TODO: validate if file is image
          return true;
        } else {
          throw new Error("Banner image is required");
        }
      }),
    ];
  }
}
