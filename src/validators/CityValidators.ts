import { body } from "express-validator";

export class CityValidators {
  static addCity() {
    return [
      body("name", "City name is required").isString(),
      body("lat", "City name is required").isNumeric(),
      body("lng", "City name is required").isNumeric(),
    ];
  }
}
