import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const eventsDbId = import.meta.env.VITE_APPWRITE_EVENTS_DB_ID as string;

export const eventsCollectionId = import.meta.env
  .VITE_APPWRITE_EVENTS_COLLECTION_ID as string;

export const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT as string;

export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECTID as string;

export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKETID as string;

export const adminTeamId = import.meta.env
  .VITE_APPWRITE_TEAM_ADMIN_ID as string;

export const commentsCollectionId = import.meta.env
  .VITE_APPWRITE_COMMENTS_COLLECTION_ID;
