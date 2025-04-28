import {
  ITranscribeVideoCommand,
  TranscribeVideoCommand,
  VideoDto
} from "@diploma-lnu-kaparys/diploma-api-client";
import { videosClient } from "../api/ApiClients";

import ServiceBase from "./ServiceBase";

class VideoService extends ServiceBase {
  async getVideoById(id: number): Promise<VideoDto> {
    return videosClient.getVideoById(id);
  }

  async transcribeVideo(variables: ITranscribeVideoCommand) {
    const command = new TranscribeVideoCommand(variables);
    return videosClient.transcribeVideo(command);
  }
}

export default new VideoService();
