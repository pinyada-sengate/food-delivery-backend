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

  static async getRestaurants(req, res, next) {}
}
