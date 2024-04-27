import City from "../models/City";

export class CityController {
  static async addCity(req, res, next) {
    const { name, lat, lng } = req.body;

    try {
      const city = await new City({
        name,
        lat,
        lng,
      }).save();

      res.send(city);
    } catch (e) {
      next(e);
    }
  }

  static async getCities(req, res, next) {}
}
