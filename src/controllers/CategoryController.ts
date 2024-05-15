import Category from "../models/Category";

export class CategoryController {
  static async getCategoriesByRestaurantId(req, res, next) {
    try {
      const { restaurantId } = req.param;
      const categories = await Category.find({ restaurant_id: restaurantId });
      res.send(categories);
    } catch (e) {
      next(e);
    }
  }
}
