import { body, param } from "express-validator";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";

export class ItemValidators {
  static addItem() {
    return [
      body("restaurant_id", "Restaurant id is required")
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
      body("category_id", "Category id is required")
        .isString()
        .custom(async (categoryId, { req }) => {
          try {
            const category = await Category.findOne({
              _id: categoryId,
              restaurant_id: req.body.restaurant_id,
            });

            if (category) {
              return true;
            } else {
              throw new Error("Category does not exist");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("name", "Item name is required").isString(),
      body("price", "Price is required").isNumeric(),
      body("vegan", "Vegan is required").isBoolean(),
      body("itemImages", "Item image is required").custom((item, { req }) => {
        if (req.file) {
          //TODO: validate if file is image
          return true;
        } else {
          throw new Error("Item image is required");
        }
      }),
    ];
  }

  static getItemsByRestaurantId() {
    return [
      param("restaurantId", "Restaurant id is required")
        .isString()
        .custom(async (restaurantId, { req }) => {
          try {
            const restaurant = await Restaurant.findById(restaurantId);

            if (restaurant) {
              req.restaurant = restaurant;
              return true;
            } else {
              throw new Error("Restaurant does not exist");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
    ];
  }
}
