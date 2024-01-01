import Layout from "@/components/Layout";
import Container from "@/components/Container";
// import Button from '@/components/Button';

import { useEffect, useState } from "react";
import { getEvent, deleteEvent } from "@/api/events";
import { Event } from "@/lib/types";
import Button from "@/components/Button";
import { deleteFile, getImageUrl } from "@/lib/storage";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AppwriteException } from "appwrite";
import Comments from "@/components/Comments";

function Event({ params }: { params: { eventId: string } }) {
  const { isAdmin } = useAuth();

  const [event, setEvent] = useState<Event | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [, navigate] = useLocation();

  const imageUrl = event?.imgFileId && getImageUrl(event?.imgFileId);

  const image = {
    width: event?.imgWidth,
    height: event?.imgHeight,
    url: imageUrl as string,
    alt: event?.name,
  };

  useEffect(() => {
    (async function run() {
      setLoading(true);
      try {
        const res = await getEvent(params?.eventId);
        setEvent(res);
      } catch (error: unknown) {
        if (error instanceof AppwriteException) {
          if (error?.type === "document_not_found") {
            navigate("/?error=event-not-found");
          }
        } else {
          navigate("/?error=something-went-wrong");
        }
      }
      setLoading(false);
    })();
  }, [navigate, params?.eventId]);

  async function handleDelete() {
    if (!event?.id) return;
    setDeleting(true);
    await deleteEvent(event?.id);
    setDeleting(false);
    navigate("/");
  }

  if (loading) {
    return (
      <Layout>
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <img
              className="block rounded-md"
              width={image.width}
              height={image.height}
              src={image?.url || "/assets/placeholder.png"}
              alt={image?.alt || "Placeholder"}
            />
          </div>

          <div className="flex-1 py-1 space-y-6">
            <div className="h-4 max-w-sm mb-10 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 col-span-2 rounded bg-slate-700"></div>
                <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                <div className="h-2 col-span-1 rounded bg-slate-700"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <img
            className="block rounded-md"
            width={image.width}
            height={image.height}
            src={image?.url || "/assets/placeholder.png"}
            alt={image?.alt || "Placeholder"}
          />
        </div>

        <div className="space-y-3">
          {event && (
            <>
              <h1 className="mb-6 text-3xl font-bold">{event?.name}</h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong>{" "}
                <span className="text-gray-400">
                  {event?.date &&
                    new Date(event?.date).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong>{" "}
                <span className="text-gray-400">{event?.location}</span>
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                {event?.description && (
                  <>
                    <strong>Description:</strong>{" "}
                    <span className="text-gray-400">{event?.description}</span>
                  </>
                )}
              </p>
              {isAdmin && (
                <Button
                  color="red"
                  onClick={handleDelete}
                  disabled={deleting}
                  className={cn(
                    deleting && "opacity-70 cursor-not-allowed",
                    "mt-10"
                  )}
                >
                  {deleting ? "Deleting..." : "Delete Event"}
                </Button>
              )}
            </>
          )}
          <div className="h-10" />
          {event && <Comments eventId={event?.id} />}
        </div>
      </Container>
    </Layout>
  );
}

export default Event;
