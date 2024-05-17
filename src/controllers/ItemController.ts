import Item from "../models/Item";

export class ItemController {
  static async addItem(req, res, next) {
    try {
      const {
        restaurant_id,
        category_id,
        name,
        description,
        price,
        status,
        vegan,
      } = req.body;

      let data: any = {
        restaurant_id,
        category_id,
        name,
        price,
        status,
        vegan,
      };

      if (description) {
        data = { ...data, description: description };
      }

      if (req.file) {
        const path = req.file.path;
        data = { ...data, cover: path };
      }

      const item = await new Item(data).save();
      res.send(item);
    } catch (e) {
      next(e);
    }
  }

  static async getItems(req, res, next) {
    try {
      //TODO: implement getItems
    } catch (e) {
      next(e);
    }
  }
}
