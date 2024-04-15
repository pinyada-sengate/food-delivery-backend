export class UserController {
  static login(req, res) {
    const data = [{ name: "testdata" }];
    res.status(200).send(data);
  }
}
