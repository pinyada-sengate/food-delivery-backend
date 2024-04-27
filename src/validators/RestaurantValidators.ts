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
    ];
  }
}
