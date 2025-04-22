import { UsersClient } from "@diploma-lnu-kaparys/diploma-api-client";
import { axiosInstance } from "./AxiosInterceptor";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const usersClient = new UsersClient(baseUrl, axiosInstance);

export { usersClient };
