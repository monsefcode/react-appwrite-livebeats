import { ID, Models, Query } from "appwrite";

import { databases } from "@/lib/appwrite";
import type { Event } from "@/lib/types";
import { eventsCollectionId, eventsDbId } from "@/lib/utils";
import { deleteFile } from "@/lib/storage";

/**
 * Retrieves a list of events from the events database.
 * @returns A Promise that resolves to an array of Event objects.
 */
export const getEvents = async (): Promise<Event[]> => {
  const { documents } = await databases.listDocuments(
    eventsDbId,
    eventsCollectionId,
    [Query.orderDesc("$createdAt")]
  );
  return documents.map(mapDocumentForEvent);
};

/**
 * Retrieves an event by its ID.
 * @param id The ID of the event to retrieve.
 * @returns A Promise that resolves with the retrieved event.
 */
export const getEvent = async (id: Event["id"]): Promise<Event> => {
  const document = await databases.getDocument(
    eventsDbId,
    eventsCollectionId,
    id
  );
  return mapDocumentForEvent(document);
};

/**
 * Creates a new event in the database.
 * @param event The event object to be created.
 * @returns A Promise that resolves with the created event object.
 */
export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  const document = await databases.createDocument(
    eventsDbId,
    eventsCollectionId,
    ID.unique(),
    event
  );
  return mapDocumentForEvent(document);
};

/**
 * Deletes an event from the events collection.
 * @param eventId - The ID of the event to be deleted.
 * @returns A Promise that resolves with the result of the deletion operation.
 */
export const deleteEvent = async (eventId: Event["id"]) => {
  const { imgFileId } = await getEvent(eventId);
  if (imgFileId) {
    await deleteFile(imgFileId);
  }
  const res = databases.deleteDocument(eventsDbId, eventsCollectionId, eventId);
  return res;
};

//
function mapDocumentForEvent(doc: Models.Document): Event {
  const event: Event = {
    id: doc.$id,
    name: doc.name,
    description: doc.description,
    location: doc.location,
    date: doc.date,
    imgHeight: doc.imgHeight,
    imgWidth: doc.imgWidth,
    imgFileId: doc.imgFileId,
  };
  return event;
}
