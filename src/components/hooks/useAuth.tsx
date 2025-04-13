import React from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ExchangeRefreshCommand } from "@diploma-lnu-kaparys/diploma-api-client";
import { usersClient } from "../../api/ApiClients";
import TokenService from "../utils/token";

export interface DecodedJwt extends JwtPayload {
  user_id: string | null;
  user_email: string | null;
}
export interface AuthContextInterface {
  userId: string | null;
  authorized: boolean;
  refreshToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  setState: (token: string | null) => AuthContextInterface;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

const defaultContextState = {
  userId: null
} as AuthContextInterface;

const authContext =
  React.createContext<AuthContextInterface>(defaultContextState);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const getJwtPayload = (token: string | null) => {
    if (!token) {
      return {
        userId: null
      };
    }

    const decodedJwt = jwtDecode<DecodedJwt>(token);
    return {
      userId: decodedJwt?.["user_id"]
    };
  };

  const localAccessToken = TokenService.getLocalAccessToken();
  const payload = getJwtPayload(localAccessToken);
  const [userId, setUserId] = React.useState(payload.userId);

  const setState = (token: string | null) => {
    const tokenPayload = getJwtPayload(token);
    setUserId(tokenPayload.userId);

    return tokenPayload as AuthContextInterface;
  };

  const auth = {
    userId,

    authorized: !!userId,

    async refreshToken() {
      const { accessToken } = await usersClient.refresh(
        new ExchangeRefreshCommand({
          expiredToken: TokenService.getLocalAccessToken() ?? ""
        })
      );
      TokenService.updateLocalAccessToken(accessToken ?? "");

      const payload = setState(accessToken ?? "");
      return payload.userId;
    },

    async logout() {
      try {
        await usersClient.signOut();
      } finally {
        TokenService.removeLocalAccessToken();
        setState(null);
      }
    },

    setState
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}
