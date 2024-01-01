import { Link } from "wouter";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import EventCard from "@/components/EventCard";

import { useEffect, useState } from "react";

import type { Event } from "@/lib/types";
import { getEvents } from "@/api/events";
import { getImageUrl } from "@/lib/storage";
import { useAuth } from "@/hooks/use-auth";

function Home() {
  const { session } = useAuth();

  const [events, setEvents] = useState<Event[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function run() {
      setLoading(true);
      const events = await getEvents();
      setEvents(events);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Container>
          <p>Loading...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className="flex items-center justify-between mb-10">
            <h1 className="text-lg font-bold uppercase text-slate-600 dark:text-slate-200">
              Upcoming Events
            </h1>
            {session && (
              <p>
                <Link href="/events/new">
                  <a className="inline-block rounded bg-slate-600 py-1.5 px-4 text-xs font-bold uppercase text-white hover:bg-slate-500 hover:text-white">
                    Add Event
                  </a>
                </Link>
              </p>
            )}
          </Container>

          <Container>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event: Event) => {
                const imageUrl =
                  event?.imgFileId && getImageUrl(event?.imgFileId);
                return (
                  <Link key={event.name} href={`/event/${event?.id}`}>
                    <a>
                      <EventCard
                        date={event.date}
                        image={{
                          alt: "",
                          height: event.imgHeight,
                          url: imageUrl as string,
                          width: event.imgWidth,
                        }}
                        location={event.location}
                        name={event.name}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </Container>
        </>
      )}
      {Array.isArray(events) && events.length === 0 && (
        <Container>
          <p className="mb-5 text-center w-100">
            No events currently scheduled.
          </p>
          <p className="text-center w-100">
            <Link href="/events/new">
              <a>Add an Event</a>
            </Link>
          </p>
        </Container>
      )}
    </Layout>
  );
}

export default Home;
