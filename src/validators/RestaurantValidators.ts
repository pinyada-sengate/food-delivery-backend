import { body, query } from "express-validator";

export class RestaurantValidators {
  static addRestaurant() {
    return [
      body("user_id", "User id is required").isString(),
      body("city_id", "City id is required").isString(),
      body("name", "Restaurant name is required").isString(),
      body("open_time", "Open time is required").isString(),
      body("close_time", "Close time is required").isString(),
      body("address", "Restaurant address is required").isString(),
      //TODO: isObject is bug custom check cuisines format later
      body("cuisines", "Cuisines is required").isString(),
      body("restaurantImages", "Restaurant image is required").custom(
        (image, { req }) => {
          if (req.file) {
            //TODO: validate if file is image
            return true;
          } else {
            throw new Error("Restaurant image is required");
          }
        }
      ),
      //TODO: isObject is bug custom check location format later
      //{"type": "Point", "coordinates": [40.416775, -3.703790]}
      body("location", "Location is required").isString(),
    ];
  }

  static nearbyRestaurants() {
    return [
      query("lat", "Latitude is required").isNumeric(),
      query("lng", "Longitude is required").isNumeric(),
      query("radius", "Radius is required").isNumeric(),
    ];
  }

  static searchNearbyRestaurants() {
    return [
      query("lat", "Latitude is required").isNumeric(),
      query("lng", "Longitude is required").isNumeric(),
      query("radius", "Radius is required").isNumeric(),
      query("name", "Search query is required").isString(),
    ];
  }
}
