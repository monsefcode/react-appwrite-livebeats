import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import FormRow from "./FormRow";
import FormLabel from "./FormLabel";
import { AppwriteException } from "appwrite";
// ======================================================================================================== //

type CommentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  eventId: string;
};

export default function AddCommentForm({
  open,
  setOpen,
  eventId,
}: CommentProps) {
  const cancelButtonRef = useRef(null);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setIsSubmiting(true);

    const target = e.target as typeof e.target & {
      comment: { value: string };
    };

    const comment = target.comment.value;

    // create a function to return "Commenter Date ago"
    // const date = new Date();
    // const dateAgo = date.toLocaleDateString();

    try {
      // const res = await createComment(eventId, comment);
      // console.log(res);
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        setError(error?.message);
      } else {
        setError("Something went wrong.");
      }
    }
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-xl">
                <form className="w-full" onSubmit={handleOnSubmit}>
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="items-start justify-center w-full sm:flex">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-indigo-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="w-6 h-6 text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      {error && (
                        <p className="ml-4 text-sm text-center text-gray-500 sm:text-left">
                          {error}
                        </p>
                      )}
                      <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add new Comment
                        </Dialog.Title>
                        <div className="mt-2">
                          <textarea
                            id="comment"
                            name="comment"
                            className="block w-full min-w-full rounded text-slate-900 border-slate-50 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                            maxLength={500}
                            rows={5}
                            required
                            placeholder="Enter your comment here."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-indigo-50 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
