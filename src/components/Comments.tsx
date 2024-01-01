import { useState } from "react";
import AddCommentForm from "./AddCommentForm.tsx";
import Button from "./Button";

const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Eduardo Benz", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
    date: "6d ago",
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Hilary Mahy", href: "#" },
    assigned: { name: "Kristin Watson", href: "#" },
    date: "2d ago",
  },
  {
    id: 3,
    type: "tags",
    person: { name: "Hilary Mahy", href: "#" },
    tags: [
      { name: "Bug", href: "#", color: "bg-rose-500" },
      { name: "Accessibility", href: "#", color: "bg-indigo-500" },
    ],
    date: "6h ago",
  },
  {
    id: 4,
    type: "comment",
    person: { name: "Jason Meyers", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
    date: "2h ago",
  },
];

export default function Comments({ eventId }: { eventId: string }) {
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        <div className="flex items-center mb-4">
          <Button className="" onClick={() => setOpenCommentModal(true)}>
            Add comment
          </Button>
          <AddCommentForm
            eventId={eventId}
            open={openCommentModal}
            setOpen={setOpenCommentModal}
          />
        </div>
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-3">
              {activityItemIdx !== activity.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-500"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                {activityItem.type === "comment" ? (
                  <>
                    <div className="relative">
                      <img
                        className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring ring-indigo-400"
                        src={activityItem.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>
                        <div className="text-sm">
                          <a
                            href={activityItem.person.href}
                            className="font-medium text-gray-300"
                          >
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-indigo-400">
                          Commented {activityItem.date}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
