import { Models } from "appwrite";

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  imgHeight: number;
  imgWidth: number;
  imgFileId: string;
};

export type Comment = {
  id: string;
  eventId: string;
  text: string;
  createdAt: string;
};

export type AuthContextType = {
  session?: Models.Session | null;
  logOut: () => void;
  logIn: (email: string) => void;
  verifySession: (options: { userId: string; secret: string }) => void;
  isAdmin?: boolean;
};
