import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { getEnviromentVariables } from "./environments/environment";
import UserRouter from "./routers/UserRouter";
import BannerRouter from "./routers/BannerRouter";
import CityRouter from "./routers/CityRouter";
import RestaurantRouter from "./routers/RestaurantRouter";
import CategoryRouter from "./routers/CategoryRouter";
import ItemRouter from "./routers/ItemRouter";
import AddressRouter from "./routers/AddressRouter";
import OrderRouter from "./routers/OrderRouter";
import { Utils } from "./utils/Utils";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.dotenvConfigs();
    this.connectMongoDB();
    this.allowCors();
    this.configureBodyParser();
  }

  dotenvConfigs() {
    Utils.dotenvConfigs();
  }

  connectMongoDB() {
    console.log(getEnviromentVariables().mongoURI);
    mongoose.connect(getEnviromentVariables().mongoURI).then(() => {
      console.log("Connected to mongodb");
    });
  }

  configureBodyParser() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  allowCors() {
    this.app.use(cors());
  }

  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/banner", BannerRouter);
    this.app.use("/api/city", CityRouter);
    this.app.use("/api/restaurant", RestaurantRouter);
    this.app.use("/api/category", CategoryRouter);
    this.app.use("/api/item", ItemRouter);
    this.app.use("/api/address", AddressRouter);
    this.app.use("/api/order", OrderRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something went wrong",
        status_code: errorStatus,
      });
    });
  }
}
