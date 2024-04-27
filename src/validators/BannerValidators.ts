import { body } from "express-validator";

export class BannerValidators {
  static addBanner() {
    return [
      body("banner", "Banner is required").custom(async (banner, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("Banner image is required");
        }
      }),
    ];
  }
}
