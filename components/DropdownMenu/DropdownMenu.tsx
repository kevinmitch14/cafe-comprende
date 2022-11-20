import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BookmarkIcon,
  DotsVerticalIcon,
  MapIcon,
  ShareIcon,
} from "@heroicons/react/outline";

const DropdownMenuDemo = () => {
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
          className="rounded-md border bg-white py-1 shadow-md"
          align="end"
        >
          <DropdownMenu.Item className="mx-1 rounded px-2 py-1 hover:bg-slate-100">
            <button
              onClick={() => console.log("Get directions")}
              className="flex items-center gap-2"
            >
              <BookmarkIcon className="h-4 w-4" />
              Bookmark
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mx-1 rounded px-2 py-1 hover:bg-slate-100">
            <button
              onClick={() => console.log("Share")}
              className="flex items-center gap-2"
            >
              <ShareIcon className="h-4 w-4" />
              Share
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mx-1 rounded px-2 py-1 hover:bg-slate-100">
            <button
              onClick={() => console.log("Get directions")}
              className="flex items-center gap-2"
            >
              <MapIcon className="h-4 w-4" />
              Directions
            </button>
          </DropdownMenu.Item>
          {/* <DropdownMenu.Separator className="m-1 h-[1px] bg-red-400"></DropdownMenu.Separator> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
