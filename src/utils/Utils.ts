export class Utils {
  static generateVerificationToken(digit: number = 6): string {
    const max = 10;
    let otp = "";

    for (let i = 0; i < digit; i++) {
      const ran = Math.floor(Math.random() * max);
      otp += ran;
    }

    return otp;
  }
}
