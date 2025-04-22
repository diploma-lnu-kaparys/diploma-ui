import { jwtDecode } from "jwt-decode";
import { DecodedJwt } from "../hooks/useAuth";

type SessionTokenDecoded = {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]: string;
  exp: number;
};

export default class SignupSessionTokenService {
  static sessionTokenKey = "signupSessionToken";

  static getSessionToken() {
    return localStorage.getItem(this.sessionTokenKey);
  }
  static updateSessionToken(token: string) {
    localStorage.setItem(this.sessionTokenKey, token);
  }
  static removeSessionToken() {
    localStorage.removeItem(this.sessionTokenKey);
  }
  static decodeSessionToken(token: string) {
    const decoded = jwtDecode<SessionTokenDecoded>(token);
    return {
      email:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      expiration: decoded.exp
    };
  }
  static isSessionTokenValid(token: string) {
    const secondsSinceEpoch = Date.now() / 1000;
    const tokenExpirationInSecondsSinceEpoch =
      jwtDecode<DecodedJwt>(token)["exp"];
    return secondsSinceEpoch < (tokenExpirationInSecondsSinceEpoch as number);
  }
}
