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

  static async getLimitedAddresses(req, res, next) {
    const limit = req.query.limit;
    try {
      const addresses = await Address.find({}).limit(limit);
      res.send(addresses);
    } catch (e) {
      next(e);
    }
  }

  static async deleteAddress(req, res, next) {
    const userId = req.user.user_id;
    try {
      await Address.findOneAndDelete({
        user_id: userId,
        _id: req.params.id,
      });
      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAddressesById(req, res, next) {
    const userId = req.user.user_id;
    try {
      const address = await Address.findOne({
        user_id: userId,
        _id: req.params.id,
      });
      res.send(address);
    } catch (e) {
      next(e);
    }
  }

  static async editAddress(req, res, next) {
    const userId = req.user.user_id;
    const data = req.body;
    try {
      const address = await Address.findOne(
        {
          user_id: userId,
          _id: req.params.id,
        },
        {
          title: data.title,
          address: data.address,
          house: data.house,
          lat: data.lat,
          lng: data.lng,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );

      if (address) {
        res.send(address);
      } else {
        throw new Error("address does not exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkAddress(req, res, next) {
    const userId = req.user.user_id;
    const data = req.query;
    console.log(data);
    try {
      const address = await Address.findOne({
        user_id: userId,
        lat: data.lat,
        lng: data.lng,
      });
      res.send(address);
    } catch (e) {
      next(e);
    }
  }
}
