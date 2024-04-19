export class Utils {
  public static readonly MAX_TOKEN_TIME = 5 * 60 * 1000; // 5 minute

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
