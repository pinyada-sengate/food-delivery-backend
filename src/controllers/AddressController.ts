import Address from "../models/Address";

export class AddressController {
  static async addAddress(req, res, next) {
    const { title, address, house, lat, lng, user_id } = req.body;
    try {
      const addressData = {
        user_id,
        title,
        address,
        house,
        lat,
        lng,
      };
      const addressDoc = await new Address(addressData).save();
      res.send(addressDoc);
    } catch (e) {
      next(e);
    }
  }

  static async getAddresses(req, res, next) {
    try {
      const addresses = await Address.find({});
      res.send(addresses);
    } catch (e) {
      next(e);
    }
  }
}
