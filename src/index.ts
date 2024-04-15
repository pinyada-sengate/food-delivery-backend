import * as express from "express";
import * as mongoose from "mongoose";

let app: express.Application = express();

const mongoURI: string =
  "mongodb+srv://pinyadadev:3jMjPrQmwn3THXRy@cluster0.dq3p8ve.mongodb.net/fooddeliverydb?retryWrites=true&w=majority";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(mongoURI).then(() => {
  console.log("Connected to mongodb");
});
