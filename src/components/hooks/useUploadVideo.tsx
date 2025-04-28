import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import StorageService from "../../services/StorageService";
import { ISignedUrlVm } from "@diploma-lnu-kaparys/diploma-api-client";

export interface UploadedVideo {
  videoId: number;
  objectUri: string;
}

type ProgressCb = (p: number) => void;

export function useUploadVideo(onProgress?: ProgressCb) {
  const signedMut = useMutation({
    mutationFn: ({ fileName }: { fileName: string }) =>
      StorageService.createSignedUrl({ fileName }) as Promise<ISignedUrlVm>
  });

  async function upload(file: File): Promise<UploadedVideo> {
    if (file.size > 150 * 1024 * 1024)
      throw new Error("File too large (max 150 MB)");
    if ((await getDuration(file)) > 900)
      throw new Error("Video too long (max 15 min)");

    const { url, objectUri, videoId } = await signedMut.mutateAsync({
      fileName: file.name
    });
    if (!url || !objectUri || videoId === undefined)
      throw new Error("Signed-URL response incomplete");

    await axios.put(url, file, {
      headers: { "Content-Type": "video/mp4" },
      onUploadProgress: (e) =>
        onProgress?.(e.total ? Math.round((e.loaded * 100) / e.total) : 0)
    });

    return { videoId, objectUri };
  }

  return { upload, uploading: signedMut.isPending };
}

function getDuration(file: File): Promise<number> {
  return new Promise((res, rej) => {
    const u = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      URL.revokeObjectURL(u);
      res(v.duration);
    };
    v.onerror = () => rej(new Error("Cannot read metadata"));
    v.src = u;
  });
}
