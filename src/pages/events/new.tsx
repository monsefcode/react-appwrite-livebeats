import { useState } from "react";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";
import InputFile from "@/components/InputFile";
import Button from "@/components/Button";

import { createEvent } from "@/api/events";
import { useLocation } from "wouter";
import { uploadFile } from "@/lib/storage";
import { AppwriteException } from "appwrite";

interface EventImage {
  height: number;
  width: number;
  file: File;
}

function EventNew() {
  const [, navigate] = useLocation();

  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false);

  const [image, setImage] = useState<EventImage>();

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const img = new Image();

    img.onload = function () {
      setImage({
        height: img.height,
        width: img.width,
        file: target.files[0],
      });
    };

    img.src = URL.createObjectURL(target.files[0]);
  }

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setIsSubmiting(true);

    try {
      const target = e.target as typeof e.target & {
        name: { value: string };
        date: { value: string };
        location: { value: string };
        description: { value: string };
      };

      let file;

      if (image?.file) {
        file = await uploadFile(image.file);
      }

      const result = await createEvent({
        name: target.name.value,
        date: new Date(target.date.value).toISOString(),
        location: target.location.value,
        description: target.description.value,
        imgHeight: image?.height as number,
        imgWidth: image?.width as number,
        imgFileId: file?.$id as string,
      });
      setIsSubmiting(false);

      navigate(`/event/${result.id}`);
    } catch (error: unknown) {
      setIsSubmiting(false);

      if (error instanceof AppwriteException) {
        switch (error?.type) {
          case "user_unauthorized":
            setError("You must be logged in to create an event.");
            break;
          default:
            setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-3xl font-bold">Create a New Event</h1>
          <p className="mb-4">
            Creating an event on LiveBeat is a surefire way to elevate your
            event's success to unprecedented heights. From concerts to
            festivals, LiveBeat caters to all event types, making it the ideal
            stage to capture the attention of your target audience.
          </p>
          <p>
            Focus on what matters most—delivering an unforgettable
            experience—and witness your event gain momentum like never before on
            LiveBeat.
          </p>
        </div>

        <form
          className="p-6 border rounded border-slate-200 dark:border-slate-500"
          onSubmit={handleOnSubmit}
        >
          {error && <p className="p-4 mb-6 bg-red-500 rounded">{error}</p>}
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Event Name</FormLabel>
            <InputText id="name" name="name" type="text" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="date">Event Date</FormLabel>
            <InputDate id="date" name="date" type="datetime-local" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Event Location</FormLabel>
            <InputText id="location" name="location" type="text" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Event Description</FormLabel>
            <textarea
              id="description"
              name="description"
              className="block w-full rounded text-slate-900 border-slate-400 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              maxLength={500}
              rows={5}
              required
              placeholder="Enter a description for your event."
            />
          </FormRow>

          <FormRow className="mb-6">
            <FormLabel htmlFor="image">File</FormLabel>
            <InputFile id="image" name="image" onChange={handleOnChange} />
            <p className="mt-2 text-xs font-semibold text-gray-400">
              Accepted File Types: jpg, png, jpeg
            </p>
          </FormRow>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Container>
    </Layout>
  );
}

export default EventNew;
