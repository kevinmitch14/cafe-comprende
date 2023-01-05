import { useState } from "react";
import { RateExistingCafeModal } from "../Modal/RateExistingCafeModal";
import { CafeProps, Review } from "./Cafe.types";
import Dropdown from "../DropdownMenu/DropdownMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../hooks/useProfile";
import { BookmarkIcon } from "@heroicons/react/outline";
import axios from "axios";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const Cafe = ({ cafe }: { cafe: CafeProps }) => {

  const addBookmark = useMutation(
    () => {
      return axios.post("/api/addBookmark", { place_id: cafe.place_id });
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
      return axios.post("/api/removeBookmark", { place_id: cafe.place_id });
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const accumCafeRating = cafe.reviews.reduce(
    (prev: number, current: Review) => prev + current.rating,
    0
  );
  const numberOfCafeReviews = cafe.reviews.length;
  const averageCafeRating = accumCafeRating / numberOfCafeReviews;

  const handleDialog = () => {
    dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  };

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['profile']) as Profile
  const isCafeBookmarked = data?.bookmarks?.some((item: CafeProps) => item.place_id === cafe.place_id);

  return (
    <div className="flex flex-col relative gap-2 items-start p-4 rounded-lg shadow-sm border mb-3">
      <Dropdown placeId={cafe.place_id} />
      <h3 className="text-lg font-bold text-left w-11/12">{cafe.name}</h3>
      <p className="text-sm font-medium">
        Rating:{" "}
        {Number.isInteger(averageCafeRating)
          ? averageCafeRating
          : averageCafeRating.toFixed(1)}
        /5
        <span className="pl-1 text-sm text-gray-500">
          ({numberOfCafeReviews}{" "}
          {numberOfCafeReviews > 1 ? "reviews" : "review"})
        </span>
      </p>
      <div className="flex gap-x-2 mt-1">
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={handleDialog}
        >
          Rate
        </button>
        <button
          className="mt-3 flex items-center gap-1 w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => isCafeBookmarked ? removeBookmark.mutate() :
            addBookmark.mutate()}
        >
          {addBookmark.isLoading || removeBookmark.isLoading ? <LoadingSpinner size="small" /> : isCafeBookmarked ?
            <BookmarkIcon className="fill-blue-500 stroke-blue-500 h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />
            :
            <BookmarkIcon className="h-4 w-4 transition-transform delay-[25ms] group-hover:scale-105" />}
          {/* {isCafeBookmarked ? 'Remove bookmark' : 'Bookmark'} */}
        </button>
      </div>
      {dialogOpen && (
        <RateExistingCafeModal handleDialog={handleDialog} cafe={cafe} />
      )}
    </div>
  );
};
