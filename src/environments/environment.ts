import { DevEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";

export interface Environment {
  mongoURI: string;
  sendGridKey: string;
}

export function getEnviromentVariables() {
  if (process.env.NODE_ENV === "production") {
    return ProdEnvironment;
  }

  return DevEnvironment;
}
