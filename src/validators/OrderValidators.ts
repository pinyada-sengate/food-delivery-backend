import { body } from "express-validator";
import Restaurant from "../models/Restaurant";

export class OrderValidators {
  static placeOrder() {
    return [
      body("restaurant_id", "Restaurant ID is required")
        .isString()
        .custom(async (restaurantId, { req }) => {
          try {
            const restaurant = await Restaurant.findById(restaurantId);

            if (restaurant) {
              return true;
            } else {
              throw new Error("Restaurant does not exist");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("order", "Order is required").isString(),
      body("address", "Address is required").isString(),
      body("payment_status", "Payment status is required").isBoolean(),
      body("payment_mode", "Payment mode is required").isString(),
      body("Total", "Total is required").isNumeric(),
      body("delivery_fee", "Delivery free is required").isNumeric(),
    ];
  }
}
