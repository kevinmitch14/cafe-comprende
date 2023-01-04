import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BookmarkIcon,
  DotsVerticalIcon,
  MapIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../hooks/useProfile";
import { CafeProps } from "../Cafe/Cafe.types";


const shareCafe = () => {
  console.log("Share Cafe");
};
const bookmarkCafe = (place_id: string) => {
  return axios.post('/api/addBookmark', { place_id: place_id })
};

const getDirectionsToCafe = () => {
  console.log("Get directions");
};

const DropdownMenuDemo = ({ placeId }: { placeId: string }) => {
  // TODO optimistic updates
  const addBookmark = useMutation(
    () => {
      return axios.post("/api/addBookmark", { place_id: placeId });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["profile"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );
  const removeBookmark = useMutation(
    () => {
      return axios.post("/api/removeBookmark", { place_id: placeId });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["profile"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['profile']) as Profile
  const isCafeBookmarked = data?.bookmarks?.some((item: CafeProps) => item.place_id === placeId);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="absolute top-0 right-0 m-3"
          aria-label="Customise options"
        >
          <DotsVerticalIcon className="h-4 w-4" />
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
                isCafeBookmarked ? removeBookmark.mutate() :
                  addBookmark.mutate();
              }}
              className="flex items-center gap-2"
            >
              {isCafeBookmarked ?
                <BookmarkIcon className="fill-blue-500 stroke-blue-500 h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
                :
                <BookmarkIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
              }
              {isCafeBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
            </button>
          </DropdownMenu.Item>
          {/* <DropdownMenu.Separator className="m-1 h-[1px] bg-red-400"></DropdownMenu.Separator> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
