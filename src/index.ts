import * as express from "express";
import * as mongoose from "mongoose";
import { getEnviromentVariables } from "./environments/environment";

let app: express.Application = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(getEnviromentVariables().mongoURI).then(() => {
  console.log("Connected to mongodb");
});
