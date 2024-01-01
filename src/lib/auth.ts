import { ID, Models } from "appwrite";
import { account } from "./appwrite";

export async function logIn(email: string) {
  await account.createMagicURLSession(
    ID.unique(),
    email,
    `${window.location.origin}/session`
  );
}

export async function verifySession({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
  const data = await account.updateMagicURLSession(userId, secret);
  return data;
}

export async function getCurrentSession() {
  const session = await account.getSession("current");
  return { session };
}

export async function deleteSession(id: Models.Session["$id"]) {
  await account.deleteSession(id);
}
