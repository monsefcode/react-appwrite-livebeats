import { ID } from "appwrite";
import { storage } from "./appwrite";
import { BUCKET_ID } from "./utils";

export async function uploadFile(file: File) {
  const fileId = await storage.createFile(BUCKET_ID, ID.unique(), file);
  return fileId;
}

export function getImageUrl(fileId: string) {
  return storage.getFilePreview(BUCKET_ID, fileId);
}

export async function deleteFile(fileId: string) {
  const res = await storage.deleteFile(BUCKET_ID, fileId);
  return res;
}
