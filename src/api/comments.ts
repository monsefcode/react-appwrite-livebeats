import { Models, Query } from "appwrite";

import { databases } from "@/lib/appwrite";
import type { Comment } from "@/lib/types";
import { commentsCollectionId, eventsDbId } from "@/lib/utils";

export const getComments = async (): Promise<Comment[]> => {
  const { documents } = await databases.listDocuments(
    eventsDbId,
    commentsCollectionId,
    [Query.orderDesc("$createdAt")]
  );
  return documents.map(mapDocumentForComments);
};

//
function mapDocumentForComments(doc: Models.Document): Comment {
  const comment: Comment = {
    id: doc.$id,
    eventId: doc.eventId,
    text: doc.comment,
    createdAt: doc.$createdAt,
  };
  return comment;
}
