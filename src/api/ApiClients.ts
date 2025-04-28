import {
  UsersClient,
  StorageClient,
  VideosClient
} from "@diploma-lnu-kaparys/diploma-api-client";
import { axiosInstance } from "./AxiosInterceptor";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const usersClient = new UsersClient(baseUrl, axiosInstance);
const storageClient = new StorageClient(baseUrl, axiosInstance);
const videosClient = new VideosClient(baseUrl, axiosInstance);

export { usersClient, storageClient, videosClient };
