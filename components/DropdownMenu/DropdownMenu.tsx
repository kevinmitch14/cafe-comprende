import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
  MapIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../hooks/useProfile";
import { CafeProps } from "../Cafe/Cafe.types";
import { useAddBookmark, useRemoveBookmark } from "../../hooks/useBoomark";

// TODO implement Share Cafe + Get directions to cafe.
const shareCafe = () => {
  console.log("Share Cafe");
};

const getDirectionsToCafe = () => {
  console.log("Get directions");
};

const DropdownMenuDemo = ({ cafe }: { cafe: CafeProps }) => {
  // TODO optimistic updates
  const addBookmark = useAddBookmark(cafe);
  const removeBookmark = useRemoveBookmark(cafe);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profile"]) as Profile;
  const isCafeBookmarked = data?.bookmarks?.some(
    (item: CafeProps) => item.place_id === cafe.place_id
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="absolute top-0 right-0 m-3"
          aria-label="Customise options"
        >
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="rounded-md border bg-white py-1 shadow-md"
          align="end"
        >
          <DropdownMenu.Item
            key={"Bookmark"}
            className="group mx-1 rounded px-3 py-1 hover:bg-zinc-100"
          >
            <button
              onClick={() => {
                isCafeBookmarked
                  ? removeBookmark.mutate()
                  : addBookmark.mutate();
              }}
              className="flex items-center gap-2"
            >
              {isCafeBookmarked ? (
                <BookmarkIcon className="h-4 w-4 fill-blue-500 stroke-blue-500 transition-transform delay-[25ms] group-hover:scale-105" />
              ) : (
                <BookmarkIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
              )}
              {isCafeBookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
            </button>
          </DropdownMenu.Item>
          {/* <DropdownMenu.Separator className="m-1 h-[1px] bg-red-400"></DropdownMenu.Separator> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
