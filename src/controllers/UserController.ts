export class UserController {
  static login(req, res, next) {
    // const data = [{ name: "testdata" }];
    // res.status(200).send(data);

    // res.status(422).json({
    //   message: "Email and password does not match",
    //   status_code: 404,
    // });

    const error = new Error("Email and password does not match");
    next(error);
  }
}
