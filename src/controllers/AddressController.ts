import Address from "../models/Address";

export class AddressController {
  static async addAddress(req, res, next) {
    const data = req.body;
    try {
      const address = await new Address(data).save();
      res.send(address);
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
