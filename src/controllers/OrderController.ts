import Order from "../models/Order";

export class OrderController {
  static async placeOrder(req, res, next) {
    const data = req.body;
    const userId = req.user.user_id;

    try {
      let orderData: any = {
        user_id: userId,
        restaurant_id: data.restaurant_id,
        order: data.order,
        address: data.address,
        payment_status: data.payment_status,
        payment_mode: data.payment_mode,
        total: data.total,
        delivery_fee: data.delivery_fee,
      };

      if (data.instruction) {
        orderData = { ...orderData, instruction: data.instruction };
      }
      const order = await new Order(orderData).save();
      delete order.user_id;
      res.send(order);
    } catch (e) {
      next(e);
    }
  }
}
