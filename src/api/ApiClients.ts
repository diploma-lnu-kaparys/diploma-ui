import axios from "axios";
import { TodoListsClient } from "@diploma-lnu-kaparys/diploma-api-client";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export const todoListsClient = new TodoListsClient(baseUrl, axiosInstance);
