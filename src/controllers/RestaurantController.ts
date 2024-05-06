import Restaurant from "../models/Restaurant";

export class RestaurantController {
  static async addRestaurant(req, res, next) {
    const {
      user_id,
      city_id,
      name,
      open_time,
      close_time,
      address,
      cuisines,
      description,
      location,
    } = req.body;

    try {
      let data: any = {
        user_id,
        city_id,
        name,
        open_time,
        close_time,
        address,
        cuisines,
        location: JSON.parse(location),
      };

      if (description) {
        data = { ...data, description: description };
      }

      if (req.file) {
        const path = req.file.path;
        data = { ...data, cover: path };
      }

      const restaurant = await new Restaurant(data).save();
      res.send(restaurant);
    } catch (e) {
      next(e);
    }
  }

  static async getRestaurants(req, res, next) {
    try {
      const restaurants = await Restaurant.find({
        status: true,
      });
      res.send(restaurants);
    } catch (e) {
      next(e);
    }
  }

  static async getNearbyRestaurants(req, res, next) {
    const { lat, lng, radius } = req.query;
    //const METERS_PER_KM = 1000;
    //const EARTH_RADIUS_IN_MILE = 3963.2;
    const EARTH_RADIUS_IN_KM = 6378.1;

    try {
      const restaurants = await Restaurant.find({
        status: true,
        location: {
          // $nearSphere: {
          //   $geometry: {
          //     type: "Point",
          //     coordinates: [parseFloat(lat), parseFloat(lng)],
          //   },
          //   $maxDistance: radias * METERS_PER_KM,
          // },
          $geoWithin: {
            $centerSphere: [
              [parseFloat(lat), parseFloat(lng)],
              parseFloat(radius) / EARTH_RADIUS_IN_KM,
            ],
          },
        },
      });

      res.send(restaurants);
    } catch (e) {
      next(e);
    }
  }

  static async searchNearbyRestaurants(req, res, next) {
    const { lat, lng, radius, name } = req.query;
    const EARTH_RADIUS_IN_KM = 6378.1;

    try {
      const restaurants = await Restaurant.find({
        status: true,
        name: { $regex: name, $options: "i" },
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(lat), parseFloat(lng)],
              parseFloat(radius) / EARTH_RADIUS_IN_KM,
            ],
          },
        },
      });

      res.send(restaurants);
    } catch (e) {
      next(e);
    }
  }
}
