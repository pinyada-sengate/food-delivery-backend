import * as Bcrypt from "bcrypt";
import * as Multer from "multer";

const storageOptions = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class Utils {
  public static readonly MAX_TOKEN_TIME = 5 * 60 * 1000; // 5 minute

  public multer = Multer({ storage: storageOptions });

  static generateVerificationToken(digit: number = 6): string {
    const max = 10;
    let otp = "";

    for (let i = 0; i < digit; i++) {
      const ran = Math.floor(Math.random() * max);
      otp += ran;
    }

    return otp;
  }

  static encryptPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(data: { password: string; encryptPassword: string }) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encryptPassword, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("User and password does not match"));
        } else {
          resolve(same);
        }
      });
    });
  }
}
