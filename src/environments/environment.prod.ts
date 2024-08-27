import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
  mongoURI: process.env.PROD_MONGODB_URI,
  sendGridKey: process.env.PROD_SENDGRID_KEY,
  jwtSecretKey: process.env.PROD_JWT_SECRET_KEY,
};
