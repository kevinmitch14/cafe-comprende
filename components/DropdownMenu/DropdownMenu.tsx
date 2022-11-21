import React, { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BookmarkIcon,
  DotsVerticalIcon,
  MapIcon,
  ShareIcon,
} from "@heroicons/react/outline";

type DropdownItemProps = {
  action: () => void;
  icon: ReactNode;
  text: string;
};

const shareCafe = () => {
  console.log("Share Cafe");
};
const bookmarkCafe = () => {
  console.log("Bookmark Cafe");
};

const getDirectionsToCafe = () => {
  console.log("Get directions");
};

const listItems: DropdownItemProps[] = [
  {
    action: () => bookmarkCafe(),
    icon: (
      <BookmarkIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-110" />
    ),
    text: "Bookmark",
  },
  {
    action: () => getDirectionsToCafe(),
    icon: (
      <MapIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-110" />
    ),
    text: "Directions",
  },
  {
    action: () => shareCafe(),
    icon: (
      <ShareIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-110" />
    ),
    text: "Share",
  },
];

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
          sideOffset={5}
          className="rounded-md border bg-white py-1 shadow-md"
          align="end"
        >
          {listItems.map(({ text, action, icon }) => {
            return (
              <DropdownMenu.Item
                key={text}
                className="group mx-1 rounded px-3 py-1 hover:bg-blue-500 hover:text-white"
              >
                <button
                  onClick={() => action}
                  className="flex items-center gap-2"
                >
                  {icon}
                  {text}
                </button>
              </DropdownMenu.Item>
            );
          })}
          {/* <DropdownMenu.Separator className="m-1 h-[1px] bg-red-400"></DropdownMenu.Separator> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
