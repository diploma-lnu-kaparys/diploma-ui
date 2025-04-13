import {
  AuthBaseDto,
  ExchangeRefreshCommand
} from "@diploma-lnu-kaparys/diploma-api-client";
import { usersClient } from "../../api/ApiClients";
import { DecodedJwt } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default class TokenService {
  static refreshTokenPromise: Promise<AuthBaseDto> | null = null;

  /*
   * This method retrieves the access token from local storage. If this token
   * is expired, it sends a refresh token request preventing simultaneous ones.
   * If token is missing, returns null.
   */
  static async getAccessToken() {
    let accessToken = TokenService.getLocalAccessToken();

    if (!accessToken) return null;

    if (accessToken && accessTokenExpirationIsInFuture(accessToken)) {
      return accessToken;
    }

    if (TokenService.refreshTokenPromise) {
      accessToken = (await TokenService.refreshTokenPromise)?.accessToken ?? "";
    } else {
      TokenService.refreshTokenPromise = usersClient.refresh(
        new ExchangeRefreshCommand({
          expiredToken: accessToken
        })
      );
      try {
        accessToken =
          (await TokenService.refreshTokenPromise)?.accessToken ?? "";
        TokenService.updateLocalAccessToken(accessToken);
      } finally {
        TokenService.refreshTokenPromise = null;
      }
    }

    return accessToken ?? "";
  }
  static getLocalAccessToken() {
    return localStorage.getItem("accessToken");
  }
  static updateLocalAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }
  static removeLocalAccessToken() {
    localStorage.removeItem("accessToken");
  }
}

const accessTokenExpirationIsInFuture = (token: string): boolean => {
  const secondsSinceEpoch = Date.now() / 1000;
  const tokenExpirationInSecondsSinceEpoch =
    jwtDecode<DecodedJwt>(token)["exp"];
  return secondsSinceEpoch < (tokenExpirationInSecondsSinceEpoch as number);
};
