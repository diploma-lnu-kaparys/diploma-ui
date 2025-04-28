import {
  CreateSignedUrlCommand,
  ICreateSignedUrlCommand,
  SignedUrlVm
} from "@diploma-lnu-kaparys/diploma-api-client";
import { storageClient } from "../api/ApiClients";

import ServiceBase from "./ServiceBase";

class StorageService extends ServiceBase {
  async getSignedUrl(storagePath: string) {
    return storageClient.getSignedUrl(storagePath);
  }

  async createSignedUrl(
    variables: ICreateSignedUrlCommand
  ): Promise<SignedUrlVm> {
    const command = new CreateSignedUrlCommand(variables);
    return storageClient.createSignedUrl(command);
  }
}

export default new StorageService();
