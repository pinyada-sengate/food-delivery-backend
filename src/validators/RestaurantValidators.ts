import { body } from "express-validator";

export class RestaurantValidators {
  static addRestaurant() {
    return [
      body("user_id", "User id is required").isString(),
      body("city_id", "City id is required").isString(),
      body("name", "Restaurant name is required").isString(),
      body("open_time", "Open time is required").isString(),
      body("close_time", "Close time is required").isString(),
      body("address", "Restaurant address is required").isString(),
      body("cuisines", "Cuisines is required").isString(),
      body("restaurantImages", "Restaurant image is required").custom(
        (image, { req }) => {
          if (req.file) {
            //TODO: validate if file is image
            return true;
          } else {
            throw new Error("Banner image is required");
          }
        }
      ),
    ];
  }
}
