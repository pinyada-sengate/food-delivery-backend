import * as nodeMailer from "nodemailer";
import * as SenGrid from "nodemailer-sendgrid-transport";

import { getEnviromentVariables } from "../environments/environment";

export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport(
      SenGrid({
        auth: {
          api_key: getEnviromentVariables().sendGridKey,
        },
      })
    );
  }

  static sendMail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initiateTransport().sendMail({
      from: "pinyada.dev@gmail.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
