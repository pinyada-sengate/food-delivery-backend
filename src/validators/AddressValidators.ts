import { body } from "express-validator";

export class AddressValidators {
  static addAddress() {
    return [
      body("title", "Title is required").isString(),
      body("address", "Address is required").isString(),
      body("house", "House no. is required").isString(),
      body("lat", "Latitude is required").isNumeric(),
      body("lng", "Longitude is required").isNumeric(),
      body("user_id", "user id is required")
        .isString()
        .custom((userId, { req }) => {
          if (userId === req.user.user_id) {
            return true;
          } else {
            throw new Error("Not the same user");
          }
        }),
    ];
  }
}
